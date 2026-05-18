-- ============================================================
-- Exercises (15 total: 8 physical, 7 mental)
-- ============================================================
insert into public.exercises (title, category, subcategory, description, instructions, duration_min, difficulty) values

-- Physical: Workout
('Bodyweight Circuit',
 'physical', 'workout',
 'A full-body workout using only your bodyweight. Great for building strength and boosting mood.',
 array[
   'Start with 60 seconds of jumping jacks to warm up.',
   'Do 3 rounds of: 10 push-ups, 15 squats, 20 mountain climbers.',
   'Rest 60 seconds between rounds.',
   'Cool down with 2 minutes of slow walking in place.'
 ], 20, 'intermediate'),

('Morning Stretch Routine',
 'physical', 'stretching',
 'A gentle full-body stretch to wake up your muscles and set a positive tone for the day.',
 array[
   'Neck rolls: slowly roll your head in a circle 5 times each direction.',
   'Shoulder shrugs: raise shoulders to ears, hold 3 seconds, release. Repeat 8 times.',
   'Cat-Cow stretch: on hands and knees, alternate arching and rounding your back. 10 reps.',
   'Seated forward fold: reach toward your toes and hold 30 seconds.',
   'Hip flexor stretch: lunge forward on each leg, hold 20 seconds per side.'
 ], 10, 'beginner'),

('10-Minute Walk Break',
 'physical', 'movement',
 'A brisk walk to break up sedentary time and lift your mood. Even short walks significantly reduce anxiety.',
 array[
   'Step outside or find a safe indoor route.',
   'Walk at a pace where you can hold a conversation but feel slightly out of breath.',
   'Notice 5 things you can see around you — this adds a mindfulness element.',
   'Return and take 3 deep breaths before sitting back down.'
 ], 10, 'beginner'),

('4-7-8 Breathing',
 'physical', 'breathing',
 'A structured breathing technique developed by Dr. Andrew Weil that activates the parasympathetic nervous system and reduces anxiety within minutes.',
 array[
   'Sit comfortably with your back straight.',
   'Exhale completely through your mouth.',
   'Close your mouth and inhale quietly through your nose for 4 counts.',
   'Hold your breath for 7 counts.',
   'Exhale completely through your mouth for 8 counts.',
   'Repeat this cycle 4 times. Do not do more than 4 cycles at first.'
 ], 5, 'beginner'),

('Box Breathing',
 'physical', 'breathing',
 'Used by Navy SEALs and athletes to calm the nervous system under stress. Works by regulating the autonomic nervous system.',
 array[
   'Sit upright in a comfortable chair.',
   'Slowly exhale all air from your lungs.',
   'Inhale slowly for 4 counts.',
   'Hold your breath for 4 counts.',
   'Exhale slowly for 4 counts.',
   'Hold empty for 4 counts.',
   'Repeat for 4–6 rounds or until calm.'
 ], 5, 'beginner'),

('Yoga Sun Salutation',
 'physical', 'stretching',
 'A flowing sequence of 12 yoga poses that builds warmth, flexibility, and focus. A complete mini-practice on its own.',
 array[
   'Mountain Pose: stand tall, hands at heart center.',
   'Upward Salute: inhale, sweep arms overhead.',
   'Standing Forward Fold: exhale, fold forward.',
   'Low Lunge: step right foot back, left knee bent.',
   'Plank: step back to plank position, hold.',
   'Chaturanga: lower halfway, elbows close to ribs.',
   'Upward Dog: press up, chest forward, hips low.',
   'Downward Dog: lift hips, press heels down, hold 3 breaths.',
   'Reverse steps back to Mountain Pose.',
   'Repeat on the opposite side. Do 3–5 rounds.'
 ], 15, 'intermediate'),

('HIIT Cardio Burst',
 'physical', 'workout',
 'Short, intense bursts of exercise followed by rest. Research shows 20 minutes of HIIT improves mood as effectively as 30 minutes of steady-state cardio.',
 array[
   'Warm up: 2 minutes of light jogging in place.',
   'Work interval (40 sec): high knees as fast as possible.',
   'Rest interval (20 sec): walk in place.',
   'Repeat with: burpees, jump squats, lateral shuffles.',
   'Complete 4–6 rounds total.',
   'Cool down: 2 minutes of slow walking and deep breathing.'
 ], 20, 'advanced'),

('Progressive Muscle Relaxation',
 'physical', 'movement',
 'A technique of tensing and releasing muscle groups systematically to relieve physical tension held in the body due to stress.',
 array[
   'Lie down or sit comfortably. Close your eyes.',
   'Start with your feet: tense the muscles tightly for 5 seconds.',
   'Release suddenly and notice the feeling of relaxation for 10 seconds.',
   'Move up: calves, thighs, abdomen, chest, hands, arms, shoulders, face.',
   'Tense each group for 5 seconds, release for 10 seconds.',
   'End by taking 3 deep slow breaths.'
 ], 15, 'beginner'),

-- Mental: CBT
('Thought Record (CBT)',
 'mental', 'cbt',
 'A core CBT technique for identifying and challenging unhelpful automatic thoughts. Regularly practicing thought records reduces depressive and anxious thinking over time.',
 array[
   'Identify the situation: what happened? Where were you? When?',
   'Notice your emotions: name each emotion and rate intensity 0–100%.',
   'Write the automatic thought: what went through your mind?',
   'Find the evidence FOR this thought.',
   'Find the evidence AGAINST this thought.',
   'Write a balanced alternative thought.',
   'Re-rate your emotional intensity. Notice any shift.'
 ], 15, 'beginner'),

('Behavioral Activation',
 'mental', 'cbt',
 'A CBT technique for depression that involves scheduling enjoyable or meaningful activities to break the cycle of withdrawal and low mood.',
 array[
   'List 10 activities you used to enjoy or that give you a sense of accomplishment.',
   'Rate each activity: how much pleasure or mastery would it give? (0–10)',
   'Choose one small activity to schedule for today or tomorrow.',
   'Do it, even if motivation is low — action precedes motivation in depression.',
   'Afterward, note how you felt before, during, and after.',
   'Gradually add more activities each week.'
 ], 20, 'beginner'),

('5-4-3-2-1 Grounding',
 'mental', 'mindfulness',
 'A sensory grounding technique that interrupts anxiety and panic by anchoring attention to the present moment.',
 array[
   'Pause and take one slow deep breath.',
   'Name 5 things you can SEE right now.',
   'Name 4 things you can physically FEEL (textures, temperature).',
   'Name 3 things you can HEAR.',
   'Name 2 things you can SMELL.',
   'Name 1 thing you can TASTE.',
   'Take another slow deep breath. Notice how you feel.'
 ], 5, 'beginner'),

('Body Scan Meditation',
 'mental', 'mindfulness',
 'A mindfulness practice of systematically directing attention through the body. Reduces stress, improves body awareness, and is commonly used in MBSR programs.',
 array[
   'Lie on your back with arms at your sides. Close your eyes.',
   'Take 5 slow breaths to settle.',
   'Bring attention to the top of your head. Notice any sensation without judging.',
   'Slowly move attention downward: forehead, eyes, jaw (unclench it), neck, shoulders.',
   'Continue through chest, belly, lower back, hips, thighs, knees, calves, feet.',
   'If your mind wanders, gently return to where you left off.',
   'End by wiggling fingers and toes and opening your eyes slowly.'
 ], 15, 'beginner'),

('Gratitude Practice',
 'mental', 'mindfulness',
 'Writing 3 specific things you are grateful for daily has been shown in randomized trials to significantly increase wellbeing and reduce depressive symptoms over 4 weeks.',
 array[
   'Set aside 5 minutes at the same time each day (morning or night works well).',
   'Write 3 specific things you are grateful for today.',
   'For each one, write WHY you are grateful for it — this deepens the effect.',
   'Be specific: "my friend texted to check on me" beats "my friends".',
   'Avoid repeating the same items — challenge yourself to find new ones.'
 ], 5, 'beginner'),

('Worry Time',
 'mental', 'cbt',
 'A structured CBT technique that contains chronic worrying to a scheduled 20-minute window, reducing its intrusion into the rest of the day.',
 array[
   'Choose a consistent 20-minute worry window each day (not close to bedtime).',
   'When a worry arises outside this window, write it down and postpone it.',
   'Tell yourself: "I will think about this during worry time."',
   'When worry time arrives, review your list.',
   'For each worry, ask: is this solvable? If yes, brainstorm one small action step.',
   'If it is not solvable, practice letting it go and move on.',
   'When the 20 minutes end, stop — even if the list is not finished.'
 ], 20, 'beginner'),

('Loving-Kindness Meditation',
 'mental', 'mindfulness',
 'A Buddhist-derived meditation practice (Metta) shown in research to increase positive emotions, reduce self-criticism, and improve social connection.',
 array[
   'Sit comfortably. Close your eyes and take 3 slow breaths.',
   'Bring to mind yourself. Silently repeat: "May I be happy. May I be healthy. May I be at peace."',
   'Now bring to mind someone you love easily. Repeat the phrases for them.',
   'Bring to mind a neutral person (a neighbor, a cashier). Repeat the phrases.',
   'Bring to mind a difficult person. Offer the phrases — this is the hardest part.',
   'Finally, extend to all beings everywhere: "May all beings be happy. May all beings be at peace."',
   'Take 3 breaths and open your eyes.'
 ], 15, 'intermediate');

-- ============================================================
-- Journal Prompts (8 total)
-- ============================================================
insert into public.journal_prompts (text, category) values
('What is one thing that went well today, and what role did you play in making it happen?', 'gratitude'),
('Describe a recent moment when you felt anxious or overwhelmed. What was the automatic thought running through your mind?', 'cbt'),
('What are three things your body did for you today that you usually take for granted?', 'body-awareness'),
('If your best friend were in your exact situation, what advice would you give them?', 'self-compassion'),
('What does a "good enough" day look like for you right now — not a perfect day, just good enough?', 'values'),
('Write about a small act of kindness you gave or received recently. How did it feel?', 'connection'),
('What is one belief about yourself that might be holding you back? Where do you think it came from?', 'cbt'),
('Describe one thing you are looking forward to, however small. Why does it matter to you?', 'motivation');

-- ============================================================
-- Facts (18 total across 6 topics)
-- ============================================================
insert into public.facts (topic, statement, explanation, citation) values

-- Anxiety (3)
('Anxiety',
 'Avoidance makes anxiety worse over time, not better.',
 'When you avoid a feared situation, you feel immediate relief — but that relief reinforces the avoidance. Over time the fear grows, because you never learn you can tolerate discomfort or that the feared outcome is unlikely. Exposure-based therapy works by systematically reversing this pattern.',
 '{"authors": "Craske MG, Treanor M, Conway CC, et al.", "title": "Maximizing exposure therapy: an inhibitory learning approach", "journal": "Behaviour Research and Therapy", "year": 2014, "url": "https://pubmed.ncbi.nlm.nih.gov/24864005/"}'::jsonb),

('Anxiety',
 'CBT has over 300 randomized controlled trials behind it — making it the most-studied psychological treatment for anxiety disorders.',
 'Meta-analyses consistently show CBT produces significant reductions across all anxiety subtypes including generalized anxiety disorder, panic disorder, and social anxiety. Effects are durable: gains hold up at 1–2 year follow-ups without ongoing treatment.',
 '{"authors": "Hofmann SG, Asnaani A, Vonk IJ, et al.", "title": "The Efficacy of Cognitive Behavioral Therapy: A Review of Meta-analyses", "journal": "Cognitive Therapy and Research", "year": 2012, "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3584580/"}'::jsonb),

('Anxiety',
 'Slow diaphragmatic breathing reduces anxiety within minutes by activating the body''s calming system.',
 'Breathing slowly and deeply stimulates the vagus nerve, shifting the autonomic nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest) dominance. This measurably lowers heart rate and cortisol. Even 5 minutes of controlled breathing produces significant reductions in self-reported anxiety.',
 '{"authors": "Zaccaro A, Piarulli A, Laurino M, et al.", "title": "How Breath-Control Can Change Your Life: A Systematic Review on Psycho-Physiological Correlates of Slow Breathing", "journal": "Frontiers in Human Neuroscience", "year": 2018, "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/"}'::jsonb),

-- Depression (3)
('Depression',
 'Exercise outperformed antidepressants and psychotherapy for reducing depression in a 2023 meta-analysis of over 1,000 trials.',
 'A landmark analysis of 1,039 RCTs found that physical activity — especially walking, strength training, and yoga — produced large short-term reductions in depressive symptoms. Effects were strongest for moderate-to-vigorous intensity exercise done at least three times per week.',
 '{"authors": "Singh B, Olds T, Curtis R, et al.", "title": "Effectiveness of physical activity interventions for improving depression, anxiety and distress: an overview of systematic reviews", "journal": "British Journal of Sports Medicine", "year": 2023, "url": "https://bjsm.bmj.com/content/57/18/1203"}'::jsonb),

('Depression',
 'Depression physically shrinks the hippocampus — and exercise reverses this.',
 'Chronic stress and depression reduce the volume of the hippocampus, the brain region central to memory and emotional regulation. Exercise stimulates production of BDNF (Brain-Derived Neurotrophic Factor), which promotes new neuron growth and has been shown to restore hippocampal volume in people with depression.',
 '{"authors": "Erickson KI, Voss MW, Prakash RS, et al.", "title": "Exercise training increases size of hippocampus and improves memory", "journal": "Proceedings of the National Academy of Sciences", "year": 2011, "url": "https://pubmed.ncbi.nlm.nih.gov/21282661/"}'::jsonb),

('Depression',
 'Behavioral activation — doing things before you feel like it — is as effective as full CBT for depression.',
 'Depression creates a cycle: low mood leads to withdrawal, which deepens low mood. Behavioral activation breaks this by scheduling meaningful or pleasurable activities regardless of motivation. Studies find it matches full CBT in effectiveness and is often recommended as a first step because it''s simpler to learn and act on.',
 '{"authors": "Cuijpers P, van Straten A, Warmerdam L", "title": "Behavioral activation treatments of depression: A meta-analysis", "journal": "Clinical Psychology Review", "year": 2007, "url": "https://pubmed.ncbi.nlm.nih.gov/17379385/"}'::jsonb),

-- Mood (3)
('Mood',
 'Writing down three specific things you''re grateful for each day measurably increases wellbeing within four weeks.',
 'Multiple RCTs show that a daily gratitude practice reduces depressive symptoms and increases life satisfaction. The key is specificity — "a colleague covered for me so I could leave early" has a stronger effect than "my job." Adding why you''re grateful amplifies the benefit further.',
 '{"authors": "Emmons RA, McCullough ME", "title": "Counting blessings versus burdens: an experimental investigation of gratitude and subjective wellbeing in daily life", "journal": "Journal of Personality and Social Psychology", "year": 2003, "url": "https://pubmed.ncbi.nlm.nih.gov/12585811/"}'::jsonb),

('Mood',
 'Social connection predicts mood and life satisfaction more reliably than income, status, or physical health.',
 'A 75-year longitudinal study (the Harvard Study of Adult Development) found that the quality of close relationships is the strongest predictor of wellbeing and longevity. Even brief positive social interactions — a genuine conversation with a stranger — produce measurable mood improvements.',
 '{"authors": "Waldinger RJ, Schulz MS", "title": "What''s love got to do with it? Social functioning, perceived health, and daily happiness in married octogenarians", "journal": "Psychology and Aging", "year": 2010, "url": "https://pubmed.ncbi.nlm.nih.gov/20954785/"}'::jsonb),

('Mood',
 'Mood follows action. Waiting to feel motivated before acting is the opposite of how motivation actually works.',
 'Research on behavioral activation consistently shows that engaging in activities — even small, low-effort ones — improves mood and generates motivation afterward, not before. This challenges the common assumption that you need to "feel ready" first. Acting despite low mood is itself the intervention.',
 '{"authors": "Mazzucchelli T, Kane R, Rees C", "title": "Behavioral Activation Treatments for Depression in Adults: A Meta-analysis and Review", "journal": "Clinical Psychology: Science and Practice", "year": 2009, "url": "https://psycnet.apa.org/record/2009-20375-004"}'::jsonb),

-- Sleep (3)
('Sleep',
 'A single night of poor sleep increases emotional reactivity by up to 60% the next day.',
 'fMRI studies show that sleep deprivation amplifies amygdala response to negative stimuli while weakening prefrontal cortex regulation — the brain''s braking system. This makes you more reactive to stressors and less able to regulate emotions, creating a biological basis for why everything feels harder after bad sleep.',
 '{"authors": "Walker MP, van der Helm E", "title": "Overnight therapy? The role of sleep in emotional brain processing", "journal": "Psychological Bulletin", "year": 2009, "url": "https://pubmed.ncbi.nlm.nih.gov/19702380/"}'::jsonb),

('Sleep',
 'Keeping a consistent wake time — not bedtime — is the most powerful lever for improving sleep quality.',
 'The circadian rhythm is anchored by light and wake time, not when you go to bed. Irregular wake times fragment sleep architecture over time. Sleep restriction therapy, which uses a fixed early wake time to build sleep pressure, is the core of CBT for insomnia (CBT-I) — the first-line treatment for chronic insomnia.',
 '{"authors": "Edinger JD, Arnedt JT, Bertisch SM, et al.", "title": "Behavioral and psychological treatments for chronic insomnia disorder in adults", "journal": "Journal of Clinical Sleep Medicine", "year": 2021, "url": "https://pubmed.ncbi.nlm.nih.gov/33164741/"}'::jsonb),

('Sleep',
 'Chronic short sleep (under 7 hours) triiples the risk of developing depression.',
 'Large longitudinal studies show that people who regularly sleep fewer than 7 hours are significantly more likely to develop depression and anxiety disorders over time. The relationship is bidirectional — poor sleep worsens mental health, and poor mental health disrupts sleep — creating a cycle that requires addressing both simultaneously.',
 '{"authors": "Baglioni C, Battagliese G, Feige B, et al.", "title": "Insomnia as a predictor of depression: A meta-analytic evaluation of longitudinal epidemiological studies", "journal": "Journal of Affective Disorders", "year": 2011, "url": "https://pubmed.ncbi.nlm.nih.gov/21300408/"}'::jsonb),

-- Exercise & Mental Health (3)
('Exercise & Mental Health',
 'Even a single 10-minute walk produces measurable improvements in energy, mood, and tension.',
 'Studies consistently show that brief bouts of aerobic exercise reduce fatigue and tension while improving vigor within minutes. The effect is dose-dependent at low doses — meaning you don''t need a full workout for meaningful benefits. This makes walking one of the most accessible and evidence-backed mood interventions available.',
 '{"authors": "Penedo FJ, Dahn JR", "title": "Exercise and well-being: a review of mental and physical health benefits associated with physical activity", "journal": "Current Opinion in Psychiatry", "year": 2005, "url": "https://pubmed.ncbi.nlm.nih.gov/16639173/"}'::jsonb),

('Exercise & Mental Health',
 'Exercise increases serotonin, dopamine, and norepinephrine — the same neurotransmitters targeted by antidepressant medications.',
 'Aerobic exercise stimulates the synthesis and release of all three major mood-regulating neurotransmitters. Unlike medication, exercise also increases BDNF (brain fertilizer), reduces inflammation, and improves sleep — addressing multiple biological pathways involved in depression and anxiety simultaneously.',
 '{"authors": "Meeusen R, De Meirleir K", "title": "Exercise and brain neurotransmission", "journal": "Sports Medicine", "year": 1995, "url": "https://pubmed.ncbi.nlm.nih.gov/8587183/"}'::jsonb),

('Exercise & Mental Health',
 'People who exercise regularly have a 25–48% lower lifetime risk of developing depression or anxiety.',
 'A prospective meta-analysis of over 260,000 people found that higher levels of physical activity were associated with significantly reduced risk of developing depression, independent of other factors. Even leisure walking at recommended levels (150 min/week) produced a 25% reduction in risk.',
 '{"authors": "Schuch FB, Vancampfort D, Firth J, et al.", "title": "Physical Activity and Incident Depression: A Meta-Analysis of Prospective Cohort Studies", "journal": "American Journal of Psychiatry", "year": 2018, "url": "https://pubmed.ncbi.nlm.nih.gov/29690792/"}'::jsonb),

-- CBT & Mindfulness (3)
('CBT & Mindfulness',
 'Emotions are driven by interpretations, not events. CBT works by teaching you to spot and test the interpretations.',
 'Aaron Beck''s cognitive model, developed in the 1960s, established that automatic thoughts — rapid, often unconscious interpretations of situations — are the proximate cause of emotional distress, not the situations themselves. CBT''s core skill is learning to identify these thoughts, evaluate the evidence for them, and generate more accurate alternatives.',
 '{"authors": "Beck AT", "title": "The current state of cognitive therapy: a 40-year retrospective", "journal": "Archives of General Psychiatry", "year": 2005, "url": "https://pubmed.ncbi.nlm.nih.gov/16330717/"}'::jsonb),

('CBT & Mindfulness',
 'Mindfulness-Based Cognitive Therapy reduces depression relapse risk by ~50% in people with three or more prior episodes.',
 'MBCT combines mindfulness meditation with CBT skills specifically to prevent depression relapse. A meta-analysis of nine RCTs found it reduced relapse risk by 34% overall, and by approximately 50% in people with the highest recurrence history. It is now recommended in UK NICE guidelines as a first-line treatment for recurrent depression.',
 '{"authors": "Kuyken W, Warren FC, Taylor RS, et al.", "title": "Efficacy of Mindfulness-Based Cognitive Therapy in Prevention of Depressive Relapse", "journal": "JAMA Psychiatry", "year": 2016, "url": "https://pubmed.ncbi.nlm.nih.gov/27119968/"}'::jsonb),

('CBT & Mindfulness',
 'Eight weeks of daily mindfulness practice produces visible changes in brain structure.',
 'A landmark neuroimaging study found that participants in an 8-week MBSR program showed increased cortical thickness in regions associated with attention, interoception, and sensory processing. The amygdala — the brain''s threat-detection center — showed reduced gray matter density, correlating with reduced stress. These structural changes appeared after just two months of practice.',
 '{"authors": "Lazar SW, Kerr CE, Wasserman RH, et al.", "title": "Meditation experience is associated with increased cortical thickness", "journal": "NeuroReport", "year": 2005, "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1361002/"}'::jsonb);
