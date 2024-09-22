CREATE OR REPLACE FUNCTION handle_daily_checkin(input_user_id TEXT)
RETURNS JSON LANGUAGE plpgsql
AS $$
DECLARE
    today DATE := CURRENT_DATE;
    yesterday DATE := CURRENT_DATE - INTERVAL '1 day';
    last_checkin RECORD;
    added_points INT;
    new_consecutive_days INT;
BEGIN
    -- Lấy bản ghi check-in gần nhất
    SELECT * INTO last_checkin
    FROM "DailyCheckin" AS dc
    WHERE dc.user_id = input_user_id
    FOR UPDATE;

    -- Kiểm tra nếu người dùng đã check-in hôm nay
    IF last_checkin IS NOT NULL AND last_checkin.checkin_date = today THEN
        RETURN json_build_object('error', 'You can only check-in once per day');
    END IF;

    -- Nếu chưa có bản ghi check-in, tạo mới
    IF last_checkin IS NULL THEN
        added_points := 10;
        new_consecutive_days := 1;

        INSERT INTO "DailyCheckin" (id, user_id, checkin_date, consecutive_days, reward_points, last_checkin_date)
        VALUES (gen_random_uuid(), input_user_id, today, new_consecutive_days, added_points, today);

        -- Cộng điểm cho người dùng
        UPDATE "User"
        SET reward_point = reward_point + added_points
        WHERE telegram_id = input_user_id;

        -- Trả về kết quả sau khi thêm mới
        RETURN json_build_object('consecutive_days', new_consecutive_days, 'reward_points', added_points);

    ELSE
        -- Kiểm tra nếu check-in liên tục
        IF last_checkin.last_checkin_date >= yesterday THEN
            -- Người dùng check-in liên tục
            new_consecutive_days := last_checkin.consecutive_days + 1;

            added_points := CASE
                                WHEN new_consecutive_days >= 7 THEN 70
                                ELSE new_consecutive_days * 10
                            END;

            UPDATE "DailyCheckin"
            SET consecutive_days = new_consecutive_days,
                reward_points = reward_points + added_points,
                last_checkin_date = today,
                checkin_date = today -- Cập nhật ngày check-in mới
            WHERE "DailyCheckin".user_id = input_user_id;

        ELSE
            -- Người dùng không check-in liên tục, reset về ngày 1 và cộng 10 điểm
            new_consecutive_days := 1;
            added_points := 10;

            UPDATE "DailyCheckin"
            SET consecutive_days = new_consecutive_days,
                reward_points = reward_points + added_points,
                last_checkin_date = today,
                checkin_date = today -- Cập nhật ngày check-in mới
            WHERE "DailyCheckin".user_id = input_user_id;
        END IF;

        -- Cộng điểm cho người dùng
        UPDATE "User"
        SET reward_point = reward_point + added_points
        WHERE telegram_id = input_user_id;

        -- Trả về kết quả sau khi cập nhật
        RETURN json_build_object(
          'consecutive_days', new_consecutive_days,
          'reward_points', added_points
        );
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        -- Xử lý tất cả các lỗi khác và trả về thông báo lỗi
        RETURN json_build_object('error', SQLERRM);
END;
$$;
