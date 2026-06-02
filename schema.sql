-- 1. Create Businesses Table
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Alter Profiles Table to include business_id reference
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS business_id UUID REFERENCES public.businesses(id) ON DELETE SET NULL;

-- 3. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    status TEXT NOT NULL DEFAULT 'New',
    value NUMERIC,
    location TEXT,
    source TEXT,
    summary TEXT,
    notes TEXT,
    last_contact TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Conversations Table with JSONB messages thread
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT,
    last_message TEXT,
    last_message_time TIMESTAMPTZ DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'New',
    messages JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create Missed Calls Table (for stats tracking)
CREATE TABLE IF NOT EXISTS public.missed_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    phone TEXT NOT NULL,
    recovered BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Create Recovery Activities Table (for timeline tracking)
CREATE TABLE IF NOT EXISTS public.recovery_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_id UUID NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    "desc" TEXT,
    color TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Insert the Dedicated Demo Business
INSERT INTO public.businesses (id, name)
VALUES ('00000000-0000-0000-0000-000000000000', 'ABC Plumbing Demo')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- 8. Seed Sample Leads for Demo Business
INSERT INTO public.leads (business_id, name, phone, service, status, value, location, source, summary, notes, last_contact, created_at)
VALUES 
    (
      '00000000-0000-0000-0000-000000000000', 
      'Anthony Williams', 
      '0412 345 678', 
      'Hot Water System Repair', 
      'New', 
      550, 
      'Brisbane, QLD', 
      'Missed Call (07) 3123 4567', 
      'Customer called about a hot water system that is not heating. They have no hot water and need it fixed asap. Mentioned it is an electric system.', 
      'Customer needs urgent repair. Mentioned they work from home and need hot water for the weekend.', 
      now() - interval '12 minutes', 
      now() - interval '12 minutes'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Sarah Connolly', 
      '0423 987 654', 
      'Blocked Drain', 
      'Contacted', 
      380, 
      'Gold Coast, QLD', 
      'Missed Call (07) 3123 4567', 
      'Customer has a blocked drain in the bathroom. It is overflowing when the shower runs. Urgent response requested.', 
      'Tenant was in a hurry. Gate code is #1042.', 
      now() - interval '28 minutes', 
      now() - interval '28 minutes'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Mark Robinson', 
      '0433 111 222', 
      'Switchboard Upgrade', 
      'Quoted', 
      1500, 
      'Ipswich, QLD', 
      'Website Lead Form', 
      'Wants an old fuse box upgraded to modern circuit breakers with safety switches. Needs a formal written quote for real estate.', 
      'Sent preliminary pricing ranges. Customer will confirm a time for site inspection next week.', 
      now() - interval '1 hour', 
      now() - interval '1 hour'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Emma Thompson', 
      '0408 765 432', 
      'Tap Replacement', 
      'New', 
      200, 
      'Brisbane, QLD', 
      'Missed Call (07) 3123 4567', 
      'Kitchen mixer tap is leaking heavily from the base and needs full replacement. Customer already has the new tap ready to install.', 
      'Prefers afternoon booking.', 
      now() - interval '2 hours', 
      now() - interval '2 hours'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Daniel Lee', 
      '0410 555 987', 
      'Ceiling Fan Installation', 
      'Contacted', 
      425, 
      'Sunshine Coast, QLD', 
      'Missed Call (07) 3123 4567', 
      'Needs 3 new ceiling fans installed in bedrooms. Wiring is already in place from old light fittings.', 
      'Standard high ceilings (2.7m).', 
      now() - interval '3 hours', 
      now() - interval '3 hours'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'James Brown', 
      '0421 654 321', 
      'Burst Pipe', 
      'Won', 
      800, 
      'Brisbane, QLD', 
      'Emergency Call Out', 
      'Pipe burst in front garden behind the meter. High pressure leak. Plumber dispatched instantly and water mains shut off.', 
      'Job successfully completed, copper pipes replaced. Invoice sent via Xero.', 
      now() - interval '1 day', 
      now() - interval '1 day'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Laura McKenzie', 
      '0437 222 789', 
      'Powerpoint Installation', 
      'Lost', 
      240, 
      'Redcliffe, QLD', 
      'Missed Call (07) 3123 4567', 
      'Wanted 2 double powerpoints installed in kitchen splashback. Cable run requires drilling through tiles.', 
      'Lost due to price. Customer got a cheaper quote from a local handyman.', 
      now() - interval '2 days', 
      now() - interval '2 days'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Peter Stevens', 
      '0416 333 777', 
      'Toilet Repair', 
      'New', 
      275, 
      'Toowoomba, QLD', 
      'Missed Call (07) 3123 4567', 
      'Toilet cistern is constantly running water. Inlet valve or washer needs replacement. Not emergency but wants it sorted this week.', 
      'Available Wednesday all day.', 
      now() - interval '3 days', 
      now() - interval '3 days'
    )
ON CONFLICT DO NOTHING;

-- 9. Seed Sample Conversations with Messages thread for Demo Business
INSERT INTO public.conversations (business_id, name, phone, service, last_message, last_message_time, status, messages, created_at)
VALUES 
    (
      '00000000-0000-0000-0000-000000000000', 
      'Sarah Parker', 
      '0412 345 678', 
      'Plumbing', 
      'Perfect, thank you.', 
      now() - interval '12 minutes', 
      'Recovered', 
      '[
        {"sender": "tradycall", "text": "Hi Sarah, sorry we missed your call.\nWould you like us to arrange a plumbing quote?", "time": "2:21 pm"},
        {"sender": "customer", "text": "Yes please. My hot water system isn''t working.", "time": "2:24 pm"},
        {"sender": "tradycall", "text": "Thanks Sarah. A plumber will contact you shortly.", "time": "2:25 pm"},
        {"sender": "customer", "text": "Perfect, thank you.", "time": "2:30 pm"}
      ]'::jsonb,
      now() - interval '12 minutes'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Jake Dixon', 
      '0433 567 890', 
      'Electrical', 
      'Can you come tomorrow?', 
      now() - interval '28 minutes', 
      'Quote Sent', 
      '[
        {"sender": "tradycall", "text": "Hi Jake, sorry we missed your call. How can we help?", "time": "1:40 pm"},
        {"sender": "customer", "text": "I need an electrician to check my fuse box.", "time": "1:43 pm"},
        {"sender": "tradycall", "text": "No worries, we''ve sent through a quote. Let us know if it suits!", "time": "1:45 pm"},
        {"sender": "customer", "text": "Can you come tomorrow?", "time": "1:47 pm"}
      ]'::jsonb,
      now() - interval '28 minutes'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Mia Campbell', 
      '0455 678 901', 
      'Hot Water Systems', 
      'Sounds good, thanks!', 
      now() - interval '1 hour', 
      'Booked', 
      '[
        {"sender": "tradycall", "text": "Hi Mia, we noticed you called — would you like us to book a technician?", "time": "12:10 pm"},
        {"sender": "customer", "text": "Yes, my hot water isn''t heating.", "time": "12:14 pm"},
        {"sender": "tradycall", "text": "We''ve booked you in for tomorrow morning. A technician will call to confirm.", "time": "12:16 pm"},
        {"sender": "customer", "text": "Sounds good, thanks!", "time": "12:18 pm"}
      ]'::jsonb,
      now() - interval '1 hour'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Tom Wills', 
      '0411 234 567', 
      'Roofing', 
      'Still waiting on my insurer.', 
      now() - interval '2 hours', 
      'No Response', 
      '[
        {"sender": "tradycall", "text": "Hi Tom, we missed your call. Do you need a roofing quote?", "time": "10:55 am"},
        {"sender": "customer", "text": "Still waiting on my insurer.", "time": "11:02 am"}
      ]'::jsonb,
      now() - interval '2 hours'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Amanda Harris', 
      '0422 345 678', 
      'Plumbing', 
      'Yes, that works for me.', 
      now() - interval '2 hours', 
      'Booked', 
      '[
        {"sender": "tradycall", "text": "Hi Amanda, sorry we missed you. Would Tuesday at 10 AM work for a plumber visit?", "time": "9:10 am"},
        {"sender": "customer", "text": "Yes, that works for me.", "time": "9:15 am"}
      ]'::jsonb,
      now() - interval '2 hours'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Bradley Smith', 
      '0444 567 890', 
      'Electrical', 
      'Please send through a quote.', 
      now() - interval '1 day', 
      'Quote Sent', 
      '[
        {"sender": "tradycall", "text": "Hi Bradley, we missed your call. Need electrical help?", "time": "Yesterday"},
        {"sender": "customer", "text": "Please send through a quote.", "time": "Yesterday"}
      ]'::jsonb,
      now() - interval '1 day'
    ),
    (
      '00000000-0000-0000-0000-000000000000', 
      'Luke Pearson', 
      '0466 789 012', 
      'HVAC', 
      'Not sure yet, I''ll get back to you.', 
      now() - interval '1 day', 
      'No Response', 
      '[
        {"sender": "tradycall", "text": "Hi Luke, noticed you rang. Can we help with anything HVAC related?", "time": "Yesterday"},
        {"sender": "customer", "text": "Not sure yet, I''ll get back to you.", "time": "Yesterday"}
      ]'::jsonb,
      now() - interval '1 day'
    )
ON CONFLICT DO NOTHING;

-- 10. Seed Sample Missed Calls (used for metrics calculation)
INSERT INTO public.missed_calls (business_id, phone, recovered, created_at)
VALUES 
    ('00000000-0000-0000-0000-000000000000', '0412 345 678', true, now() - interval '8 hours'),
    ('00000000-0000-0000-0000-000000000000', '0433 567 890', true, now() - interval '7 hours'),
    ('00000000-0000-0000-0000-000000000000', '0401 234 567', true, now() - interval '6 hours'),
    ('00000000-0000-0000-0000-000000000000', '0422 789 123', false, now() - interval '5 hours'),
    ('00000000-0000-0000-0000-000000000000', '0418 111 222', false, now() - interval '4 hours'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 888', true, now() - interval '3 hours'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 777', true, now() - interval '2 hours'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 666', true, now() - interval '1 hour'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 555', true, now() - interval '45 minutes'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 444', false, now() - interval '30 minutes'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 333', false, now() - interval '15 minutes'),
    ('00000000-0000-0000-0000-000000000000', '0499 999 222', false, now() - interval '5 minutes')
ON CONFLICT DO NOTHING;

-- 11. Seed Sample Activity Feed for Demo Business
INSERT INTO public.recovery_activities (business_id, title, "desc", color, icon, created_at)
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'Missed Call Captured', '0412 345 678', 'bg-[#FEF08A] text-[#854D0E]', 'PhoneMissed', now() - interval '30 minutes'),
    ('00000000-0000-0000-0000-000000000000', 'SMS Sent', 'Auto-reply sent', 'bg-[#DBEAFE] text-[#1E40AF]', 'MessageSquare', now() - interval '29 minutes'),
    ('00000000-0000-0000-0000-000000000000', 'Customer Replied', 'Customer responded via SMS', 'bg-[#DCFCE7] text-[#166534]', 'MessageSquare', now() - interval '23 minutes'),
    ('00000000-0000-0000-0000-000000000000', 'Lead Qualified', 'High intent identified', 'bg-[#F3E8FF] text-[#6B21A8]', 'User', now() - interval '5 minutes'),
    ('00000000-0000-0000-0000-000000000000', 'Conversation Active', 'Assigned to team member', 'bg-[#DBEAFE] text-[#1E40AF]', 'MessageSquare', now() - interval '1 minute')
ON CONFLICT DO NOTHING;

-- 12. Enable Row Level Security (RLS)
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missed_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_activities ENABLE ROW LEVEL SECURITY;

-- 13. Drop existing policies if they exist (to support re-running)
DROP POLICY IF EXISTS "Allow public read access for Demo Business" ON public.businesses;
DROP POLICY IF EXISTS "Allow user to select linked business" ON public.businesses;
DROP POLICY IF EXISTS "Allow users to insert businesses" ON public.businesses;
DROP POLICY IF EXISTS "Allow users to update own business" ON public.businesses;

DROP POLICY IF EXISTS "Allow read access for Demo or linked business leads" ON public.leads;
DROP POLICY IF EXISTS "Allow modifications to own business leads" ON public.leads;

DROP POLICY IF EXISTS "Allow read access for Demo or linked business conversations" ON public.conversations;
DROP POLICY IF EXISTS "Allow modifications to own business conversations" ON public.conversations;

DROP POLICY IF EXISTS "Allow read access for Demo or linked business missed calls" ON public.missed_calls;
DROP POLICY IF EXISTS "Allow modifications to own business missed calls" ON public.missed_calls;

DROP POLICY IF EXISTS "Allow read access for Demo or linked business activities" ON public.recovery_activities;
DROP POLICY IF EXISTS "Allow modifications to own business activities" ON public.recovery_activities;

-- 14. Create RLS Policies for Businesses Table
CREATE POLICY "Allow public read access for Demo Business" 
ON public.businesses FOR SELECT 
USING (id = '00000000-0000-0000-0000-000000000000');

CREATE POLICY "Allow user to select linked business" 
ON public.businesses FOR SELECT 
USING (id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Allow users to insert businesses" 
ON public.businesses FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update own business" 
ON public.businesses FOR UPDATE 
USING (id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

-- 15. Create RLS Policies for Leads Table
CREATE POLICY "Allow read access for Demo or linked business leads" 
ON public.leads FOR SELECT 
USING (business_id = '00000000-0000-0000-0000-000000000000' OR business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Allow modifications to own business leads" 
ON public.leads FOR ALL 
USING (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()))
WITH CHECK (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

-- 16. Create RLS Policies for Conversations Table
CREATE POLICY "Allow read access for Demo or linked business conversations" 
ON public.conversations FOR SELECT 
USING (business_id = '00000000-0000-0000-0000-000000000000' OR business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Allow modifications to own business conversations" 
ON public.conversations FOR ALL 
USING (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()))
WITH CHECK (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

-- 17. Create RLS Policies for Missed Calls Table
CREATE POLICY "Allow read access for Demo or linked business missed calls" 
ON public.missed_calls FOR SELECT 
USING (business_id = '00000000-0000-0000-0000-000000000000' OR business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Allow modifications to own business missed calls" 
ON public.missed_calls FOR ALL 
USING (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()))
WITH CHECK (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

-- 18. Create RLS Policies for Recovery Activities Table
CREATE POLICY "Allow read access for Demo or linked business activities" 
ON public.recovery_activities FOR SELECT 
USING (business_id = '00000000-0000-0000-0000-000000000000' OR business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));

CREATE POLICY "Allow modifications to own business activities" 
ON public.recovery_activities FOR ALL 
USING (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()))
WITH CHECK (business_id IN (SELECT business_id FROM public.profiles WHERE user_id = auth.uid()));
