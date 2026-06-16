const REVIEWS = {
  1: [ // Bottled Silence
    { author: "marcus", rating: 5, text: "Used it during family dinner. My mother asked if I was okay. Worth it." },
    { author: "dev", rating: 5, text: "Opened this in the office during a standup. The silence was deafening. They thought I was mad." },
    { author: "ali", rating: 4, text: "Works too well. My roommate thinks I'm ignoring him now. 10/10 would bottle again." },
  ],
  2: [ // Liquified Confidence
    { author: "jordan", rating: 5, text: "Asked for a raise. Got it. Also said things I didn't mean. Net positive." },
    { author: "casey", rating: 5, text: "Poured into my morning coffee. Wore mismatched socks on purpose. Life-changing." },
    { author: "sam", rating: 5, text: "Made eye contact with strangers for 4 hours straight. Terrifying. Recommend." },
  ],
  3: [ // Regret (Concentrated)
    { author: "alex", rating: 5, text: "Opened at 3am. Remembered the thing I said in 7th grade. Stress ball helped." },
    { author: "morgan", rating: 5, text: "Worth it just for the stress ball shaped like your bad decisions. Very accurate." },
    { author: "riley", rating: 5, text: "Cried for 2 hours. Ate ice cream. Then cried more. Would do again." },
  ],
  4: [ // Your Shadow, Pressed & Framed
    { author: "blake", rating: 5, text: "It's hanging in my office. Visitors keep asking who it is. I say 'me from the future.'" },
    { author: "drew", rating: 5, text: "Shadow looks disappointed in me. Accurate." },
    { author: "ash", rating: 4, text: "Arrived with one corner bent. Shadow doesn't look happy about it." },
  ],
  5: [ // The Apology You Owe Yourself
    { author: "charlie", rating: 5, text: "Sealed it for 6 months. When I opened it, I cried. The universe knows me better than I do." },
    { author: "jordan", rating: 5, text: "Read it once. Put it away. Read it again last week. Still hits." },
    { author: "lee", rating: 5, text: "Haven't opened it yet. The anticipation of forgiveness is therapeutic." },
  ],
  6: [ // Proof You Were Right
    { author: "sam", rating: 5, text: "Finally have documentation. Nobody believes me anyway but I know." },
    { author: "morgan", rating: 5, text: "Framed it. My ex still doesn't acknowledge it. The proof stands alone." },
    { author: "casey", rating: 4, text: "The notarization is from entities I don't understand. Still counts?" },
  ],
  7: [ // A Door That Wasn't There Yesterday
    { author: "alex", rating: 5, text: "Opened it 7 times. Went to: my childhood bedroom, a library, a hallway that smells like rain, and somewhere indescribable." },
    { author: "jordan", rating: 5, text: "My roommate saw it appear in the living room. We don't talk about it anymore." },
    { author: "riley", rating: 5, text: "Disassembly was fine. Assembly was a fever dream. Worth it for the mystery." },
  ],
  8: [ // A Room You've Never Seen Before (But Remember)
    { author: "blake", rating: 5, text: "I swear I've been here. Checked my childhood photos. Nothing matches. Still feels like home." },
    { author: "drew", rating: 5, text: "The golden hour lighting never changes. Sat there for 6 hours. Felt like 20 minutes." },
    { author: "ash", rating: 5, text: "My therapist asked about it. I couldn't explain. We both just agreed it was real." },
  ],
  9: [ // 3:47 AM (Cursed Hour, 1987)
    { author: "dev", rating: 5, text: "Opened it. Nothing happened. Checked my phone. It's 3:47 AM. It's always 3:47 AM now." },
    { author: "sam", rating: 5, text: "The ticking won't stop. It's 3:47 in my head. Is this how it's supposed to work?" },
    { author: "morgan", rating: 4, text: "Beautiful velvet case. Confusing moment. No regrets." },
  ],
  10: [ // 24 Hours of Being Right
    { author: "casey", rating: 5, text: "Activated it. Won every argument. My partner didn't speak to me for a week. Still worth it." },
    { author: "charlie", rating: 5, text: "Boss hated me for 24 hours. But I was RIGHT about the quarterly projections." },
    { author: "lee", rating: 5, text: "Time reset at midnight. Felt like losing a superpower. Already planning to buy another." },
  ],
  11: [ // Echo of a Conversation You Never Had
    { author: "blake", rating: 5, text: "Played it once. The words were exactly what I needed to hear. Been playing it on repeat." },
    { author: "jordan", rating: 5, text: "Still don't know who said it. Don't want to know. It's perfect." },
    { author: "drew", rating: 5, text: "3:47 of pure clarity. I've never felt so seen by a stranger." },
  ],
  12: [ // The Voicemail They Left at 4am (After Tequila)
    { author: "sam", rating: 5, text: "Says my name at the top and middle and end. Still can't make out what they're saying. Somehow understand everything." },
    { author: "alex", rating: 5, text: "The slur is endearing. The honesty is brutal. Worth keeping in my back pocket forever." },
    { author: "morgan", rating: 5, text: "Played it for my therapist. She listened twice. Didn't have notes." },
  ],
  13: [ // Their 'Getting Over You' Playlist
    { author: "casey", rating: 5, text: "Track 23 is definitely about me. Track 47 is suspicious. The transition is heartbreaking." },
    { author: "riley", rating: 5, text: "Some songs are aggressive. Some are melancholy. The arc is a breakup movie." },
    { author: "charlie", rating: 5, text: "Listened once. Crying. Never again. It's in my closet now and I don't go near it." },
  ],
  14: [ // The Last 12 Minutes of a Dream
    { author: "lee", rating: 5, text: "Side A is surreal. Side B is blank but somehow comforting. Listened to it every night for a week." },
    { author: "blake", rating: 5, text: "The cassette format makes it feel like a time capsule from someone else's subconscious." },
    { author: "jordan", rating: 4, text: "Can't find my tape player. Need to get one. The anticipation is killing me." },
  ],
  15: [ // Map to a Place That Only Exists When You're Asleep
    { author: "drew", rating: 5, text: "The tall building is there. The school isn't mine. I found the ocean. Couldn't leave." },
    { author: "ash", rating: 5, text: "Slept with the map under my pillow. Dreamed I was there. Woke up understanding the layout." },
    { author: "dev", rating: 5, text: "The 'maybe 4' landmarks are driving me crazy. There's definitely a 4th one. Can't remember what it is." },
  ],
  16: [ // GPS to Your Best Decision
    { author: "sam", rating: 5, text: "Battery died after 3 days. Couldn't tell if that was the point. Changed my life anyway." },
    { author: "alex", rating: 4, text: "Accuracy at 45% means I still have to guess. But the compass is beautiful." },
    { author: "morgan", rating: 5, text: "Pointed me toward quitting my job. Battery died. I quit anyway. Still unemployed but at peace." },
  ],
  17: [ // Fossilized Premonition (Unverified)
    { author: "casey", rating: 5, text: "Sealed. Can't open it. The anticipation of future knowledge is a good motivator." },
    { author: "riley", rating: 5, text: "Don't own a microwave so that warning is irrelevant. But I respect the caution." },
    { author: "charlie", rating: 5, text: "Radiometric dating says 'soon.' Am I holding the future? This is expensive anxiety." },
  ],
  18: [ // The Version of You From 5 Years Ahead
    { author: "lee", rating: 5, text: "The handwriting is mine but evolved. Like I'm becoming someone I recognize but don't know yet." },
    { author: "blake", rating: 5, text: "Haven't opened it. Planning to in 5 years. This is temporal self-care." },
    { author: "jordan", rating: 5, text: "Opened it. The advice was weird and specific and somehow exactly what I needed today." },
  ],
  19: [ // Digital Vaporizer
    { author: "drew", rating: 5, text: "Every photo gone. They have no idea. I have no idea how I feel about this." },
    { author: "ash", rating: 5, text: "The interdimensional range means they can't recover it from backup clouds. Effective." },
    { author: "dev", rating: 5, text: "Used it. Felt powerful for 10 minutes. Then felt nothing. Recommend." },
  ],
  20: [ // The Drafts Folder of Texts They Almost Sent
    { author: "sam", rating: 5, text: "47 texts. Each one shows increasing desperation. The last one cutting off mid-word broke me." },
    { author: "alex", rating: 5, text: "They cared way more than I thought. This is both beautiful and devastating." },
    { author: "morgan", rating: 5, text: "Reading the progression of their thoughts feels like archaeology. Don't recommend." },
  ],
  21: [ // Body Swap Ray
    { author: "casey", rating: 5, text: "24 hours in their body. Understand everything. Also understand why they left. Guilt is real." },
    { author: "riley", rating: 5, text: "I swear I felt what they felt. The empathy was crushing. Changed me." },
    { author: "charlie", rating: 5, text: "High cost. Worth every penny. I'm a different person now. Not sure if better." },
  ],
  22: [ // The 'I'm Not Mad' Text (Decoded)
    { author: "lee", rating: 5, text: "Translation confirmed: extremely mad. The subtext was brutal honesty." },
    { author: "blake", rating: 5, text: "I knew they were mad. This just made it official. Helpful? Maybe. Painful? Definitely." },
    { author: "jordan", rating: 5, text: "The word 'fine' translated to 'I'm reconsidering this relationship.' Accurate decoder." },
  ],
  23: [ // Your Rank in Their Search History
    { author: "drew", rating: 5, text: "I'm rank 4. Their ex is rank 1. Random stuff is rank 2. The math is devastating." },
    { author: "ash", rating: 5, text: "Higher than I expected. Still not #1. Still not sleeping." },
    { author: "dev", rating: 4, text: "Wish I hadn't opened this. Knowledge is burden. Recommend avoiding." },
  ],
  24: [ // Their Honest Opinion (Sealed)
    { author: "sam", rating: 5, text: "Still sealed. Sometimes I shake it. Sometimes I almost open it. Can't commit." },
    { author: "alex", rating: 5, text: "Opened it. They think I'm clueless but well-meaning. Fair. Also hurt." },
    { author: "morgan", rating: 3, text: "The bottle is broken. It leaked. Their opinion is all over my hands now." },
  ],
  25: [ // Selective Memory Wipe
    { author: "casey", rating: 5, text: "Chose to keep the good times. Lost the context. Now they don't make sense." },
    { author: "riley", rating: 5, text: "Recovery was disorienting. I'm missing details that matter. Don't recommend overthinking it." },
    { author: "charlie", rating: 4, text: "Deleted the fight. Also deleted why we had it. Confused now." },
  ],
  26: [ // Closure (Bottled)
    { author: "lee", rating: 5, text: "Popped the cork. Felt complete for approximately 4 hours. Then the feeling left." },
    { author: "blake", rating: 5, text: "It tastes like expensive lies. Comforting expensive lies. Worth the price." },
    { author: "jordan", rating: 5, text: "Returned it. Bought it again. The cycle continues. No regrets." },
  ],
  27: [ // Confidence You Didn't Know You Had
    { author: "drew", rating: 5, text: "Opened it. Applied for the job I thought I wasn't qualified for. Got it." },
    { author: "ash", rating: 5, text: "The side effects are real. Did things I can't explain. No regrets." },
    { author: "dev", rating: 5, text: "The confidence was real. Still have it 6 months later. Life changed." },
  ],
  28: [ // Your Unspoken Boundaries
    { author: "sam", rating: 5, text: "Read the list. Recognized myself in every line. Finally have permission to say no." },
    { author: "alex", rating: 5, text: "The permission slip is real and it works. People respect the boundaries now." },
    { author: "morgan", rating: 5, text: "Laminated it. Keeps it on my desk. Reminder that I matter." },
  ],
  29: [ // Motivation That Doesn't Feel Forced
    { author: "casey", rating: 5, text: "Shows up at the perfect moments. It's not fake. It's organic. Life-changing." },
    { author: "riley", rating: 5, text: "The timing is uncanny. Every time I consider giving up, motivation arrives." },
    { author: "charlie", rating: 5, text: "Didn't know motivation could feel this genuine. Been productive for months." },
  ],
  30: [ // Permission to Stop Trying So Hard
    { author: "lee", rating: 5, text: "Signed by the universe. No asterisks. Actually rested for the first time in years." },
    { author: "blake", rating: 5, text: "Burnt out badly. This permission slip saved me. Now I sleep." },
    { author: "jordan", rating: 5, text: "The eternal validity means I can rest guilt-free. Revolutionary." },
  ],
  31: [ // The Apology You Owe Yourself (II)
    { author: "drew", rating: 5, text: "From the universe, not from me. Different energy. Actually healed something." },
    { author: "ash", rating: 5, text: "The forgiveness is real enough. Real enough to change how I see myself." },
    { author: "dev", rating: 5, text: "Sealed. Elegant. Contains actual softness toward myself. Needed." },
  ],
  32: [ // What You'd Tell Your Younger Self
    { author: "sam", rating: 5, text: "It says 'do it exactly the same way.' Means all the mess was necessary. Oddly comforting." },
    { author: "alex", rating: 5, text: "The handwriting is mine but the wisdom isn't. Or maybe it always was." },
    { author: "morgan", rating: 5, text: "Everything you need to know from where you are now. Minimal regret. Maximum peace." },
  ],
};

export default REVIEWS;
