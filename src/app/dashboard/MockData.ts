export const MOCK_LEADS = [
  {
    id: "demo-l1",
    name: "Anthony Williams",
    phone: "0412 345 678",
    service: "Hot Water System",
    status: "New",
    value: 550,
    location: "Brisbane, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Customer called about a hot water system that is not heating. They have no hot water and need it fixed asap. Mentioned it is an electric system.",
    notes: "Customer needs urgent repair. Mentioned they work from home and need hot water for the weekend.",
    last_contact: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l2",
    name: "Sarah Connolly",
    phone: "0423 987 654",
    service: "Blocked Drain",
    status: "Contacted",
    value: 380,
    location: "Gold Coast, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Customer has a blocked drain in the bathroom. It is overflowing when the shower runs. Urgent response requested.",
    notes: "Tenant was in a hurry. Gate code is #1042.",
    last_contact: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l3",
    name: "Mark Robinson",
    phone: "0433 111 222",
    service: "Switchboard Upgrade",
    status: "Quoted",
    value: 1500,
    location: "Ipswich, QLD",
    source: "Website Lead Form",
    summary: "Wants an old fuse box upgraded to modern circuit breakers with safety switches. Needs a formal written quote for real estate.",
    notes: "Sent preliminary pricing ranges. Customer will confirm a time for site inspection next week.",
    last_contact: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l4",
    name: "Emma Thompson",
    phone: "0408 765 432",
    service: "Leaking Tap",
    status: "New",
    value: 200,
    location: "Brisbane, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Kitchen mixer tap is leaking heavily from the base and needs full replacement. Customer already has the new tap ready to install.",
    notes: "Prefers afternoon booking.",
    last_contact: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l5",
    name: "Daniel Lee",
    phone: "0410 555 987",
    service: "Ceiling Fan Installation",
    status: "Contacted",
    value: 425,
    location: "Sunshine Coast, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Needs 3 new ceiling fans installed in bedrooms. Wiring is already in place from old light fittings.",
    notes: "Standard high ceilings (2.7m).",
    last_contact: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l6",
    name: "James Brown",
    phone: "0421 654 321",
    service: "Burst Pipe",
    status: "Won",
    value: 800,
    location: "Brisbane, QLD",
    source: "Emergency Call Out",
    summary: "Pipe burst in front garden behind the meter. High pressure leak. Plumber dispatched instantly and water mains shut off.",
    notes: "Job successfully completed, copper pipes replaced. Invoice sent via Xero.",
    last_contact: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l7",
    name: "Laura McKenzie",
    phone: "0437 222 789",
    service: "Powerpoint Installation",
    status: "Lost",
    value: 240,
    location: "Redcliffe, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Wanted 2 double powerpoints installed in kitchen splashback. Cable run requires drilling through tiles.",
    notes: "Lost due to price. Customer got a cheaper quote from a local handyman.",
    last_contact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "demo-l8",
    name: "Peter Stevens",
    phone: "0416 333 777",
    service: "Toilet Repair",
    status: "New",
    value: 275,
    location: "Toowoomba, QLD",
    source: "Missed Call (07) 3123 4567",
    summary: "Toilet cistern is constantly running water. Inlet valve or washer needs replacement. Not emergency but wants it sorted this week.",
    notes: "Available Wednesday all day.",
    last_contact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const MOCK_CONVERSATIONS = [
  {
    id: "demo-c1",
    name: "Sarah Parker",
    phone: "0412 345 678",
    service: "Plumbing",
    last_message: "Perfect, thank you.",
    last_message_time: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    status: "Replied",
    messages: [
      { sender: "tradycall", text: "Hi Sarah, sorry we missed your call.\nWould you like us to arrange a plumbing quote?", time: "2:21 pm" },
      { sender: "customer", text: "Yes please. My hot water system isn't working.", time: "2:24 pm" },
      { sender: "tradycall", text: "Thanks Sarah. A plumber will contact you shortly.", time: "2:25 pm" },
      { sender: "customer", text: "Perfect, thank you.", time: "2:30 pm" }
    ],
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c2",
    name: "Jake Dixon",
    phone: "0433 567 890",
    service: "Electrical",
    last_message: "Can you come tomorrow?",
    last_message_time: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    status: "Active",
    messages: [
      { sender: "tradycall", text: "Hi Jake, sorry we missed your call. How can we help?", time: "1:40 pm" },
      { sender: "customer", text: "I need an electrician to check my fuse box.", time: "1:43 pm" },
      { sender: "tradycall", text: "No worries, we've sent through a quote. Let us know if it suits!", time: "1:45 pm" },
      { sender: "customer", text: "Can you come tomorrow?", time: "1:47 pm" }
    ],
    created_at: new Date(Date.now() - 28 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c3",
    name: "Mia Campbell",
    phone: "0455 678 901",
    service: "Hot Water Systems",
    last_message: "Sounds good, thanks!",
    last_message_time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "Booked",
    messages: [
      { sender: "tradycall", text: "Hi Mia, we noticed you called — would you like us to book a technician?", time: "12:10 pm" },
      { sender: "customer", text: "Yes, my hot water isn't heating.", time: "12:14 pm" },
      { sender: "tradycall", text: "We've booked you in for tomorrow morning. A technician will call to confirm.", time: "12:16 pm" },
      { sender: "customer", text: "Sounds good, thanks!", time: "12:18 pm" }
    ],
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c4",
    name: "Tom Wills",
    phone: "0411 234 567",
    service: "Roofing",
    last_message: "Still waiting on my insurer.",
    last_message_time: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    status: "No Response",
    messages: [
      { sender: "tradycall", text: "Hi Tom, we missed your call. Do you need a roofing quote?", time: "10:55 am" },
      { sender: "customer", text: "Still waiting on my insurer.", time: "11:02 am" }
    ],
    created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c5",
    name: "Amanda Harris",
    phone: "0422 345 678",
    service: "Plumbing",
    last_message: "Yes, that works for me.",
    last_message_time: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    status: "Booked",
    messages: [
      { sender: "tradycall", text: "Hi Amanda, sorry we missed you. Would Tuesday at 10 AM work for a plumber visit?", time: "9:10 am" },
      { sender: "customer", text: "Yes, that works for me.", time: "9:15 am" }
    ],
    created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c6",
    name: "Bradley Smith",
    phone: "0444 567 890",
    service: "Electrical",
    last_message: "Please send through a quote.",
    last_message_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "Quote Sent",
    messages: [
      { sender: "tradycall", text: "Hi Bradley, we missed your call. Need electrical help?", time: "Yesterday" },
      { sender: "customer", text: "Please send through a quote.", time: "Yesterday" }
    ],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "demo-c7",
    name: "Luke Pearson",
    phone: "0466 789 012",
    service: "HVAC",
    last_message: "Not sure yet, I'll get back to you.",
    last_message_time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "No Response",
    messages: [
      { sender: "tradycall", text: "Hi Luke, noticed you rang. Can we help with anything HVAC related?", time: "Yesterday" },
      { sender: "customer", text: "Not sure yet, I'll get back to you.", time: "Yesterday" }
    ],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

export const MOCK_ACTIVITIES = [
  {
    id: "demo-a1",
    title: "Missed Call Captured",
    desc: "0412 345 678",
    color: "bg-[#FEF08A] text-[#854D0E]",
    icon: "PhoneMissed",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: "demo-a2",
    title: "SMS Sent",
    desc: "Auto-reply sent",
    color: "bg-[#DBEAFE] text-[#1E40AF]",
    icon: "MessageSquare",
    created_at: new Date(Date.now() - 29 * 60 * 1000).toISOString()
  },
  {
    id: "demo-a3",
    title: "Customer Replied",
    desc: "Customer responded via SMS",
    color: "bg-[#DCFCE7] text-[#166534]",
    icon: "MessageSquare",
    created_at: new Date(Date.now() - 23 * 60 * 1000).toISOString()
  },
  {
    id: "demo-a4",
    title: "Lead Qualified",
    desc: "High intent identified",
    color: "bg-[#F3E8FF] text-[#6B21A8]",
    icon: "User",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    id: "demo-a5",
    title: "Conversation Active",
    desc: "Assigned to team member",
    color: "bg-[#DBEAFE] text-[#1E40AF]",
    icon: "MessageSquare",
    created_at: new Date(Date.now() - 1 * 60 * 1000).toISOString()
  }
];
