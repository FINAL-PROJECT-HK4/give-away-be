-- Thêm PostgreSQL function vào migration
CREATE OR REPLACE FUNCTION spin_wheel(user_id TEXT)
RETURNS JSON LANGUAGE plpgsql AS $$
DECLARE
    user_ticket INT;
    reward VARCHAR;
    reward_points INT := 0;
    reward_tickets INT := 0;
    spin_angle FLOAT;
BEGIN
    -- Kiểm tra số lượng ticket của người dùng
    SELECT ticket INTO user_ticket FROM "User" WHERE telegram_id = user_id;

    -- Nếu người dùng không có ticket, trả về lỗi
    IF user_ticket <= 0 THEN
        RETURN json_build_object('error', 'Not enough tickets');
    END IF;

    -- Giảm 1 ticket sau khi quay
    UPDATE "User"
    SET ticket = ticket - 1
    WHERE telegram_id = user_id;

    -- Tính toán góc quay ngẫu nhiên trong phạm vi 0 đến 360 độ
    spin_angle := RANDOM() * 360;

    -- Dựa vào góc quay để xác định phần thưởng
    IF spin_angle < 90 THEN
        -- Trúng phần thưởng 10 điểm
        reward := '10 points';
        reward_points := 10;
    ELSIF spin_angle < 180 THEN
        -- Trúng phần thưởng 1 ticket
        reward := '1 ticket';
        reward_tickets := 1;
    ELSIF spin_angle < 270 THEN
        -- Trúng phần thưởng 100 điểm
        reward := '100 points';
        reward_points := 100;
    ELSE
        -- Trúng phần thưởng 10 ticket
        reward := '500 points';
        reward_points := 500;
    END IF;

    -- Cập nhật thông tin người dùng với phần thưởng
    IF reward_points > 0 THEN
        UPDATE "User"
        SET reward_point = reward_point + reward_points
        WHERE telegram_id = user_id;
    END IF;

    IF reward_tickets > 0 THEN
        UPDATE "User"
        SET ticket = ticket + reward_tickets
        WHERE telegram_id = user_id;
    END IF;

    -- Trả về kết quả phần thưởng đã trúng cùng với góc quay
    RETURN json_build_object(
        'reward', reward,
        'reward_points', reward_points,
        'reward_tickets', reward_tickets,
        'spin_angle', spin_angle -- Trả về góc quay đã tính toán
    );

EXCEPTION
    WHEN OTHERS THEN
        -- Xử lý lỗi và trả về thông báo lỗi
        RETURN json_build_object('error', SQLERRM);
END;
$$;
