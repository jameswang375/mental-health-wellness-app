-- Run this once in the Supabase SQL Editor to create the demo reset function.
-- After creating it, also create the demo user manually in Supabase Auth → Users → "Add user"
-- and set NEXT_PUBLIC_DEMO_EMAIL / NEXT_PUBLIC_DEMO_PASSWORD in your .env.local

CREATE OR REPLACE FUNCTION public.reset_demo_data(demo_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  demo_uid uuid;
BEGIN
  SELECT id INTO demo_uid FROM auth.users WHERE email = demo_email;
  IF demo_uid IS NULL THEN
    RAISE EXCEPTION 'Demo user "%" not found', demo_email;
  END IF;

  -- Wipe existing demo data
  DELETE FROM public.mood_logs      WHERE user_id = demo_uid;
  DELETE FROM public.exercise_logs  WHERE user_id = demo_uid;
  DELETE FROM public.journal_entries WHERE user_id = demo_uid;

  -- Reset display name
  UPDATE public.profiles SET display_name = 'Demo User' WHERE user_id = demo_uid;

  -- ── Mood logs: 14 days of realistic data ───────────────────────────────
  INSERT INTO public.mood_logs (user_id, score, note, logged_at) VALUES
    (demo_uid, 8, 'Great mindfulness session this morning',      now() - interval '13 days'),
    (demo_uid, 6, 'A little anxious but managing okay',          now() - interval '12 days'),
    (demo_uid, 5, 'Rough day — feeling overwhelmed at work',     now() - interval '11 days'),
    (demo_uid, 7, 'Evening walk helped reset my mood',           now() - interval '10 days'),
    (demo_uid, 8, 'Slept really well, feeling energized',        now() - interval '9 days'),
    (demo_uid, 9, 'Had a wonderful morning routine today',       now() - interval '8 days'),
    (demo_uid, 7, 'Steady and balanced — good day',              now() - interval '7 days'),
    (demo_uid, 6, 'Tired after a busy week',                     now() - interval '6 days'),
    (demo_uid, 8, 'Productive and calm, got a lot done',         now() - interval '5 days'),
    (demo_uid, 7, 'Good day overall, nothing major',             now() - interval '4 days'),
    (demo_uid, 6, 'Felt a bit low in the afternoon',             now() - interval '3 days'),
    (demo_uid, 7, 'Exercise really helped lift my mood',         now() - interval '2 days'),
    (demo_uid, 8, 'Starting to feel more like myself again',     now() - interval '2 days'),
    (demo_uid, 8, 'Feeling positive and motivated',              now() - interval '1 day');

  -- ── Exercise logs: 8 sessions over 2 weeks ─────────────────────────────
  INSERT INTO public.exercise_logs (user_id, exercise_id, exercise_title, duration_min, notes, logged_at) VALUES
    (demo_uid, NULL, 'Box Breathing',                10, 'Helped calm pre-meeting nerves',        now() - interval '12 days'),
    (demo_uid, NULL, 'Morning Walk',                 30, 'Lovely crisp morning outside',           now() - interval '10 days'),
    (demo_uid, NULL, 'Progressive Muscle Relaxation',15, 'Great for releasing built-up tension',  now() - interval '9 days'),
    (demo_uid, NULL, 'Body Scan Meditation',         20, 'Felt deeply relaxed afterward',          now() - interval '7 days'),
    (demo_uid, NULL, 'Yoga for Anxiety',             25, 'Really enjoyed this one',                now() - interval '5 days'),
    (demo_uid, NULL, '5-4-3-2-1 Grounding',          10, 'Used it during a stressful moment',     now() - interval '3 days'),
    (demo_uid, NULL, 'Morning Walk',                 20, 'Quick walk before starting work',        now() - interval '2 days'),
    (demo_uid, NULL, 'Box Breathing',                10, 'Part of my new morning routine',         now() - interval '1 day');

  -- ── Journal entries: 4 thoughtful entries ──────────────────────────────
  INSERT INTO public.journal_entries (user_id, prompt_id, prompt_text, content, created_at) VALUES
    (demo_uid, NULL,
     'What made today difficult, and how did you cope?',
     'Today was challenging but I got through it with a few breathing exercises. I''m learning that it''s okay to not be okay sometimes — small wins still count.',
     now() - interval '11 days'),

    (demo_uid, NULL,
     'Describe a moment today when you felt at peace.',
     'Went for a long walk this morning and it completely changed my mood. The fresh air and movement made me feel so much more grounded. I want to make this a daily habit.',
     now() - interval '7 days'),

    (demo_uid, NULL,
     'What patterns have you noticed in your mood this week?',
     'I''ve been tracking my anxiety triggers more closely. Large meetings drain me, but doing box breathing beforehand really helps. Having these tools makes me feel more in control.',
     now() - interval '4 days'),

    (demo_uid, NULL,
     'What are you grateful for today?',
     'Grateful for a calm weekend. Spent time with family, cooked a proper meal, and actually switched off from work. Feeling recharged and ready for the week ahead.',
     now() - interval '1 day');

END;
$$;

-- Grant execute to authenticated role (called via service role in the API route)
GRANT EXECUTE ON FUNCTION public.reset_demo_data(text) TO service_role;
