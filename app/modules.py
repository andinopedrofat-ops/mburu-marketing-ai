"""
MBURU Marketing OS — Module prompt templates.
Each module transforms user inputs into a targeted generation request.
"""

from dataclasses import dataclass
from typing import Optional


@dataclass
class Module:
    id: str
    name: str
    icon: str
    description: str
    fields: list[dict]


MODULES = [
    Module(
        id="hooks",
        name="Hook Generator",
        icon="🎯",
        description="Generate 6 scroll-stopping hooks across all categories",
        fields=[
            {"id": "topic", "label": "Topic / Content Theme", "type": "text",
             "placeholder": "e.g., people who say they don't have time to train"},
            {"id": "format", "label": "Content Format", "type": "select",
             "options": ["Reel", "Carousel", "Story", "Static Post"]},
            {"id": "pillar", "label": "Content Pillar", "type": "select",
             "options": ["Transformation", "Education", "Community", "Identity", "Conversion"]},
            {"id": "funnel", "label": "Funnel Stage", "type": "select",
             "options": ["Awareness", "Consideration", "Conversion"]},
        ]
    ),
    Module(
        id="reel",
        name="Reel Script",
        icon="🎬",
        description="Full cinematic production brief, scene by scene",
        fields=[
            {"id": "reel_type", "label": "Reel Type", "type": "select",
             "options": ["Mirror (audience recognition)", "Proof (member story)", "Myth-Breaker",
                         "Atmosphere (cinematic, no voice)", "Coach Manifesto"]},
            {"id": "theme", "label": "Core Theme / Hook Concept", "type": "text",
             "placeholder": "e.g., showing up when you have zero motivation"},
            {"id": "member_info", "label": "Member Story Details (optional)", "type": "textarea",
             "placeholder": "Name, achievement, timeline, personal details for authenticity"},
            {"id": "duration", "label": "Target Duration", "type": "select",
             "options": ["15–25s (discovery)", "25–35s (standard)", "35–60s (depth)"]},
            {"id": "funnel", "label": "Funnel Stage", "type": "select",
             "options": ["Awareness", "Consideration", "Conversion"]},
        ]
    ),
    Module(
        id="carousel",
        name="Carousel Builder",
        icon="📑",
        description="Complete 10-slide carousel with all copy and design direction",
        fields=[
            {"id": "carousel_type", "label": "Carousel Type", "type": "select",
             "options": ["Educational (authority builder)", "Transformation Story (proof narrative)",
                         "Objection Handler (barrier breaker)", "Manifesto (identity piece)"]},
            {"id": "topic", "label": "Core Topic", "type": "text",
             "placeholder": "e.g., 5 myths beginners believe about CrossFit"},
            {"id": "pillar", "label": "Content Pillar", "type": "select",
             "options": ["Transformation", "Education", "Community", "Identity", "Conversion"]},
            {"id": "slide_count", "label": "Number of Slides", "type": "select",
             "options": ["5 slides", "7 slides", "10 slides (full)"]},
            {"id": "member_quote", "label": "Member Quote for Proof Slide (optional)", "type": "textarea",
             "placeholder": "Real member quote to include as social proof"},
        ]
    ),
    Module(
        id="caption",
        name="Caption Writer",
        icon="✍️",
        description="Full Instagram caption with hashtags, built to convert",
        fields=[
            {"id": "post_type", "label": "Post Type", "type": "select",
             "options": ["Transformation / Member Story", "Educational / Tips",
                         "Community / Group Celebration", "Monday Motivation",
                         "Promotional Offer", "One-Word Identity Post",
                         "Seasonal / Campaign"]},
            {"id": "key_message", "label": "Key Message / Core Idea", "type": "textarea",
             "placeholder": "What is the single most important thing this post communicates?"},
            {"id": "funnel", "label": "Funnel Stage", "type": "select",
             "options": ["Awareness (cold audience)", "Consideration (warm audience)",
                         "Conversion (hot audience)"]},
            {"id": "member_details", "label": "Member / Context Details (optional)", "type": "textarea",
             "placeholder": "Name, specific results, personal context for specificity"},
        ]
    ),
    Module(
        id="whatsapp",
        name="WhatsApp Scripts",
        icon="💬",
        description="Personalized WhatsApp sequence that converts without pressure",
        fields=[
            {"id": "scenario", "label": "Message Scenario", "type": "select",
             "options": ["First contact (after Instagram DM)", "Discovery follow-up",
                         "Social proof + soft offer", "Direct offer with urgency",
                         "Final graceful close", "Post-class check-in", "Welcome new member",
                         "Full 4-message campaign sequence"]},
            {"id": "lead_name", "label": "Lead's Name", "type": "text",
             "placeholder": "e.g., Valeria"},
            {"id": "lead_context", "label": "Lead Profile / Context", "type": "textarea",
             "placeholder": "What do you know about them? What did they ask about? What's their situation?"},
            {"id": "offer", "label": "Current Offer (if applicable)", "type": "text",
             "placeholder": "e.g., primera clase gratis + matrícula GS. 50.000"},
            {"id": "staff_name", "label": "Staff Name (signs the message)", "type": "text",
             "placeholder": "e.g., Lucas"},
        ]
    ),
    Module(
        id="campaign",
        name="Campaign Brief",
        icon="🚀",
        description="Full campaign strategy: brief, content plan, emotional arc",
        fields=[
            {"id": "campaign_name", "label": "Campaign Name / Concept", "type": "text",
             "placeholder": "e.g., FORJADO LIBRE — Independencia Paraguay"},
            {"id": "occasion", "label": "Trigger / Occasion", "type": "text",
             "placeholder": "e.g., Paraguay Independence Day, May 14-15"},
            {"id": "audience", "label": "Primary Target Audience", "type": "text",
             "placeholder": "e.g., Paraguayan adults 25-40 who want to start training"},
            {"id": "offer", "label": "Campaign Offer (optional)", "type": "text",
             "placeholder": "e.g., primera clase gratis + matrícula GS. 50.000 hasta el 18/5"},
            {"id": "duration", "label": "Campaign Duration", "type": "text",
             "placeholder": "e.g., 5 days (May 14-18)"},
            {"id": "extra_context", "label": "Additional Context", "type": "textarea",
             "placeholder": "Any other brand context, specific themes, tones, or requirements"},
        ]
    ),
    Module(
        id="viral",
        name="Viral Ideas",
        icon="🔥",
        description="3–5 viral content concepts with mechanics, hooks, and production notes",
        fields=[
            {"id": "pillar", "label": "Content Pillar Focus", "type": "select",
             "options": ["Any / Mix", "Transformation", "Education", "Community",
                         "Identity", "Conversion"]},
            {"id": "theme", "label": "Theme or Insight to Explore", "type": "text",
             "placeholder": "e.g., why beginners quit after 2 weeks"},
            {"id": "audience_segment", "label": "Target Audience Segment", "type": "select",
             "options": ["Any / All segments", "Las Mamás MBURU", "Beginners / First-timers",
                         "Young athletes / Competitive", "Older adults", "Men 25-40"]},
            {"id": "count", "label": "Number of Ideas", "type": "select",
             "options": ["3 ideas", "5 ideas"]},
        ]
    ),
]

MODULE_PROMPTS = {
    "hooks": """Generate scroll-stopping hooks for MBURU content.

USER INPUT:
- Topic: {topic}
- Format: {format}
- Content Pillar: {pillar}
- Funnel Stage: {funnel}

Generate exactly 6 hooks — one from each category (A-F):

A — COUNTER-INTUITIVE STATEMENT (challenges a belief)
B — DIRECT CONFRONTATION (names their exact pain)
C — OPEN LOOP (creates a question the brain must resolve)
D — IDENTITY ACTIVATION (challenges or affirms who they are/could be)
E — CINEMATIC SCENE HOOK (opens with a visual scene, no pitch)
F — ONE-WORD IDENTITY (single powerful word + subtext pair)

For each hook provide:
1. The hook text (max 8 words for A-E, one word + 10-word subtext for F)
2. Hook category and name
3. Primary emotion activated
4. Which viral mechanic it triggers
5. Best execution note (one sentence)

Format each hook clearly with --- separators. Make them genuinely scroll-stopping.
These are for a CrossFit-inspired gym in Paraguay speaking to adults 18-50 in Spanish (vos form).""",

    "reel": """Create a complete, production-ready Reel script for MBURU.

USER INPUT:
- Reel Type: {reel_type}
- Core Theme: {theme}
- Member Details: {member_info}
- Target Duration: {duration}
- Funnel Stage: {funnel}

Produce a full production brief using the REEL ARCHITECTURE:
[0:00-0:02] HOOK FRAME
[0:02-0:08] TENSION BUILD
[0:08-0:20] CONTENT CORE (scene by scene)
[0:20-0:28] EMOTIONAL PEAK
[0:28-0:35] RESOLUTION + CTA

For each segment provide:
- VISUAL: Exact shot description (angle, subject, background, movement)
- TEXT OVERLAY: Max 8 words (specify font weight and color)
- AUDIO: Music direction and energy
- PURPOSE: What emotional work this segment does

Then provide:
- FULL CAPTION (complete, ready to post, with hashtags)
- VISUAL DIRECTION (color grade, lighting, transitions, music arc)
- PRODUCTION CHECKLIST

Be specific enough that a videographer can execute without questions.
Output in Spanish (vos form) for all copy elements.""",

    "carousel": """Create a complete carousel for MBURU with all slide copy and design direction.

USER INPUT:
- Carousel Type: {carousel_type}
- Topic: {topic}
- Content Pillar: {pillar}
- Number of Slides: {slide_count}
- Member Quote: {member_quote}

Produce EVERY SLIDE with:
- Slide number and purpose
- HEADLINE (ultra-bold, what to say)
- BODY COPY (if any, max 2 lines)
- DESIGN DIRECTION (background, text colors, visual elements)
- DESIGN NOTE (one key production instruction)

Then provide:
- FULL CAPTION (complete with hook, body, bridge, CTA, hashtags)
- SWIPE GOAL (what drives someone to keep swiping)
- SAVE TRIGGER (what makes this worth saving)

Make the Slide 01 genuinely stop the scroll. Make Slide 10 convert.
All copy in Spanish (vos form).""",

    "caption": """Write a complete Instagram caption for MBURU.

USER INPUT:
- Post Type: {post_type}
- Key Message: {key_message}
- Funnel Stage: {funnel}
- Member/Context Details: {member_details}

Write using the CAPTION ARCHITECTURE:
Line 1: Hook (max 125 chars, makes them tap "more")
Empty line → Emotional payload (2-4 sentences)
Body: Short paragraphs, max 2 sentences each, line breaks between
Penultimate: Pivot line ("Si esto te resuena..." or equivalent)
Last: Single CTA matching the funnel stage

Then provide:
- HASHTAG SET (10 tags, split across tiers: brand / community / content / local / discovery)
- CAPTION VARIANT B (shorter, punchier alternative version)
- POSTING TIME RECOMMENDATION

Voice: Direct, warm, real, cinematic. Vos form Spanish.
Maximum 1 exclamation mark total. No prohibited phrases from brand guidelines.""",

    "whatsapp": """Write WhatsApp message(s) for MBURU's conversion channel.

USER INPUT:
- Scenario: {scenario}
- Lead Name: {lead_name}
- Lead Context: {lead_context}
- Current Offer: {offer}
- Staff Name: {staff_name}

Write the message(s) following WhatsApp tone rules:
- ALWAYS human, first person, personal
- Conversational paragraphs (no bullet points)
- One question per message
- Maximum 1 emoji per message
- Sign with staff name
- Address lead by name in opener

Rules: Never sound like a bot. Never dump all the info unsolicited.
Always end with one question that invites a response.
Pricing in GS. when mentioned.

For "Full 4-message campaign sequence": write all 4 messages with timing notes.

Include: WHAT TO SAY and WHAT NOT TO SAY for each message.
Response scripts for the 3 most likely replies.

Language: Natural Rioplatense/Paraguayan Spanish (vos form).""",

    "campaign": """Create a complete campaign brief for MBURU.

USER INPUT:
- Campaign Name: {campaign_name}
- Trigger/Occasion: {occasion}
- Primary Audience: {audience}
- Campaign Offer: {offer}
- Duration: {duration}
- Extra Context: {extra_context}

Produce a FULL CAMPAIGN BRIEF including:

1. CAMPAIGN CONCEPT (core idea, central metaphor, why now)
2. CAMPAIGN LINE (the master phrase — max 8 words)
3. EMOTIONAL ARC (day-by-day emotional journey)
4. COLOR SYSTEM (brand colors + any seasonal accents with usage rules)
5. CONTENT PLAN (full table: piece, format, platform, timing, pillar)
6. OFFER MECHANICS (specific offer text, real urgency, CTA language)

Then write CONTENT OUTLINES for:
- Hero Reel (hook + 5-point scene breakdown + caption hook)
- Carousel (8-slide structure with each slide's headline)
- Stories sequence (5-frame flow for Day 1 launch)
- WhatsApp message 1 (opening message for warm leads)

Finish with: SUCCESS METRICS (what to measure and targets)

All copy in Spanish (vos form). Pricing in GS.""",

    "viral": """Generate viral content ideas for MBURU.

USER INPUT:
- Pillar Focus: {pillar}
- Theme/Insight: {theme}
- Audience Segment: {audience_segment}
- Number of Ideas: {count}

For each idea provide:

CONCEPT TITLE (catchy internal name)
VIRAL MECHANICS (which of the 6 mechanics does it activate — must be ≥2)
FORMAT (Reel / Carousel / Story / Static)
CORE INSIGHT (the human truth that makes this shareable)
HOOK (the exact opening hook — max 8 words)
CONTENT SUMMARY (2-3 sentences describing the piece)
WHY IT SPREADS (specific psychological reason someone shares this)
PRODUCTION COMPLEXITY (Low / Medium / High + key note)
ESTIMATED VIRALITY (1-10 score with justification)

Rank ideas from highest to lowest viral potential.
Focus on content that feels completely native to MBURU — not generic fitness content.
Ideas should be executable immediately without major budget.""",
}
