CREATE OR REPLACE FUNCTION start_task(
    p_telegram_id VARCHAR(255),
    p_task_id VARCHAR(255),
    p_reward_point INTEGER
)
RETURNS TABLE (
    is_create BOOLEAN,
    message TEXT,
    existing_task_id VARCHAR(255)
) AS $$
DECLARE
    v_existing_task_id VARCHAR(255);
BEGIN
    -- Đảm bảo rằng giá trị của p_telegram_id và p_task_id không phải null
    IF p_telegram_id IS NULL THEN
        RAISE NOTICE 'Error: Telegram ID cannot be null';
        RETURN QUERY SELECT FALSE, 'Telegram ID cannot be null', NULL;
    END IF;

    IF p_task_id IS NULL THEN
        RAISE NOTICE 'Error: Task ID cannot be null';
        RETURN QUERY SELECT FALSE, 'Task ID cannot be null', NULL;
    END IF;

    -- Kiểm tra task đã tồn tại chưa và khóa dòng dữ liệu nếu tồn tại
    SELECT id INTO v_existing_task_id
    FROM "UserTask"
    WHERE user_telegram_id = p_telegram_id
    AND task_id = p_task_id
    AND status = 'ready'
    FOR UPDATE;

    -- Nếu task chưa tồn tại, tạo task mới
    IF v_existing_task_id IS NULL THEN
        INSERT INTO "UserTask" (id, user_telegram_id, task_id, reward_point, status)
        VALUES (gen_random_uuid(), p_telegram_id, p_task_id, p_reward_point, 'ready')
        RETURNING id INTO v_existing_task_id;

        -- Trả về kết quả
        RETURN QUERY SELECT TRUE, 'Task created successfully', v_existing_task_id;
    ELSE
        RETURN QUERY SELECT FALSE, 'Task already exists for this user', v_existing_task_id;
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION claim_task(
    p_telegram_id VARCHAR(255),
    p_task_id VARCHAR(255)
)
RETURNS TABLE (
    is_updated BOOLEAN,
    message TEXT
) AS $$
DECLARE
    v_reward_point INTEGER;
    v_user_reward_point INTEGER;
BEGIN
    -- Kiểm tra nếu task tồn tại và đang ở trạng thái 'ready'
    SELECT reward_point INTO v_reward_point
    FROM "UserTask"
    WHERE user_telegram_id = p_telegram_id
    AND task_id = p_task_id
    AND status = 'ready'
    FOR UPDATE;

    -- Nếu task không tồn tại hoặc không ở trạng thái 'ready'
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, 'No tasks were found or already claimed';
    END IF;

    -- Cập nhật trạng thái task thành 'claimed'
    UPDATE "UserTask"
    SET status = 'claimed'
    WHERE user_telegram_id = p_telegram_id
    AND task_id = p_task_id;

    -- Cộng điểm reward cho user
    SELECT reward_point INTO v_user_reward_point
    FROM "User"
    WHERE telegram_id = p_telegram_id
    FOR UPDATE;

    UPDATE "User"
    SET reward_point = v_user_reward_point + v_reward_point
    WHERE telegram_id = p_telegram_id;

    -- Trả về kết quả
    RETURN QUERY SELECT TRUE, 'Task claimed and reward updated successfully';
END;
$$ LANGUAGE plpgsql;
