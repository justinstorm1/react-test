import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internal } from './_generated/api';

const questions = [
    { optionA: "Always have to narrate your inner thoughts out loud in a monotone voice", optionB: "Always have to hear the inner thoughts of anyone within five feet of you as a scream" },
    { optionA: "Live in a world where everyone is honest but incredibly mean", optionB: "Live in a world where everyone is kind but everything they say is a lie" },
    { optionA: "Have a 5-minute conversation with your 80-year-old self", optionB: "Have a 5-minute conversation with your 8-year-old self" },
    { optionA: "Be able to stop time but you age at double speed while it's frozen", optionB: "Be able to rewind time by 10 seconds but only once every 24 hours" },
    { optionA: "Know the exact date of your death", optionB: "Know the exact cause of your death" },
    { optionA: "Have a permanent 'new car' smell coming from your pores", optionB: "Have everything you eat taste slightly like wet cardboard" },
    { optionA: "Be the smartest person in a room full of idiots", optionB: "Be the dumbest person in a room full of geniuses" },
    { optionA: "Lose the ability to use any electronic screen for a year", optionB: "Lose the ability to speak to anyone in person for a year" },
    { optionA: "Have a third eye on the back of your head that you can't close", optionB: "Have a second mouth on your palm that eats 10% of everything you touch" },
    { optionA: "Be famous for something embarrassing that happened to you", optionB: "Be completely forgotten by everyone you’ve ever met the moment you die" },
    { optionA: "Always be 20 minutes late to everything important", optionB: "Always be 2 hours early to everything boring" },
    { optionA: "Have to sweat maple syrup", optionB: "Have to cry carbonated soda" },
    { optionA: "Only be able to communicate using emojis", optionB: "Only be able to communicate using 1920s slang" },
    { optionA: "Be able to see 5 seconds into the future at all times", optionB: "Be able to see through walls but only if you are humming loudly" },
    { optionA: "Live in a house where the gravity is rotated 90 degrees", optionB: "Live in a house where the floor is permanently covered in 2 inches of lukewarm water" },
    { optionA: "Every dog you meet hates you for no reason", optionB: "Every bird you meet tries to land on your head" },
    { optionA: "Swap lives with your boss for a month", optionB: "Swap lives with your worst enemy for a week" },
    { optionA: "Never be able to wear shoes again", optionB: "Never be able to sit down again (you must lean or lie down)" },
    { optionA: "Own a remote that can 'mute' people in real life", optionB: "Own a remote that can 'subtitle' what people are actually thinking" },
    { optionA: "Be the first person to colonize Mars alone", optionB: "Be the last person left on Earth" },
    { optionA: "Have your search history published in the local newspaper", optionB: "Have your high school diary read as a podcast" },
    { optionA: "Wake up in a different random country every morning", optionB: "Never be able to leave your home town again" },
    { optionA: "Have a permanently itchy spot in the middle of your back", optionB: "Always feel like you have a small pebble in your shoe" },
    { optionA: "Become an expert at every musical instrument but lose the ability to hear", optionB: "Become a world-class chef but lose your sense of taste" },
    { optionA: "Only eat food that is blue", optionB: "Only eat food that is shaped like a cube" },
    { optionA: "Win $10 million but you have to spend it all in 24 hours", optionB: "Receive $500 every single morning for the rest of your life" },
    { optionA: "Have a tiny dragon as a pet", optionB: "Be able to transform into a giant panda at will" },
    { optionA: "Have to sleep in a coffin every night", optionB: "Have to eat every meal while standing on one leg" },
    { optionA: "Know every language in the world but never be able to travel", optionB: "Travel anywhere for free but never be able to speak the language" },
    { optionA: "Have your skin change color based on your emotions", optionB: "Have your hair grow an inch every time you tell a lie" },
    { optionA: "Be able to talk to ghosts but they only complain about the weather", optionB: "Be able to talk to animals but they all have terrible attitudes" },
    { optionA: "Always have wet socks", optionB: "Always have a faint smell of onions following you" },
    { optionA: "Have a rewind button for your life", optionB: "Have a pause button for your life" },
    { optionA: "Live in a world where it’s always Monday", optionB: "Live in a world where it’s always 3:00 AM" },
    { optionA: "Be forced to dance every time you hear music", optionB: "Be forced to sing everything you say when you're angry" },
    { optionA: "Have the power of flight but only at the speed of a brisk walk", optionB: "Have the power of super strength but only when you're crying" },
    { optionA: "Never have to sleep again with no side effects", optionB: "Never have to eat again with no side effects" },
    { optionA: "Have your life narrated by Morgan Freeman", optionB: "Have your life filmed as a sitcom with a laugh track" },
    { optionA: "Be a famous actor who is secretly miserable", optionB: "Be an unknown person who is perfectly content" },
    { optionA: "Have hands for feet", optionB: "Have feet for hands" },
    { optionA: "Only be able to whisper", optionB: "Only be able to shout" },
    { optionA: "Have a nose that grows like Pinocchio's", optionB: "Have ears that flap when you're excited" },
    { optionA: "Live in a reality that is 2D", optionB: "Live in a reality that is made of Lego" },
    { optionA: "Find your soulmate but they live on the other side of the world", optionB: "Never find your soulmate but be incredibly wealthy" },
    { optionA: "Have the ability to teleport but only to places you’ve already been", optionB: "Have the ability to fly but only 3 feet off the ground" },
    { optionA: "Be able to read minds but only when people are thinking about food", optionB: "Be able to see through clothes but only your own" },
    { optionA: "Always have a song stuck in your head that you hate", optionB: "Always have a mild itch you can't reach" },
    { optionA: "Work a job you love for no money", optionB: "Work a job you hate for a massive salary" },
    { optionA: "Have a head the size of a tennis ball", optionB: "Have a head the size of a watermelon" },
    { optionA: "Be able to control fire", optionB: "Be able to control water" },
    { optionA: "Live in a world with no internet", optionB: "Live in a world with no music" },
    { optionA: "Be reincarnated as a cat", optionB: "Be reincarnated as a majestic eagle" },
    { optionA: "Have to wear a tuxedo every day for the rest of your life", optionB: "Have to wear a clown suit every day for the rest of your life" },
    { optionA: "Be able to breathe underwater", optionB: "Be able to walk through walls" },
    { optionA: "Always be slightly too hot", optionB: "Always be slightly too cold" },
    { optionA: "Have the ability to change your appearance at will", optionB: "Have the ability to change other people's appearance" },
    { optionA: "Live in a giant treehouse", optionB: "Live in an underwater dome" },
    { optionA: "Be able to speak to your future children", optionB: "Be able to speak to your ancestors" },
    { optionA: "Have a bottomless bag of candy", optionB: "Have a bottomless bag of chips" },
    { optionA: "Only be able to use a typewriter", optionB: "Only be able to use a quill and ink" },
    { optionA: "Be a genius but everyone thinks you're crazy", optionB: "Be average but everyone thinks you're a genius" },
    { optionA: "Never be able to use a mirror again", optionB: "Never be able to use a camera again" },
    { optionA: "Have a personal robot chef", optionB: "Have a personal robot driver" },
    { optionA: "Be able to run at 60 mph", optionB: "Be able to jump 30 feet in the air" },
    { optionA: "Always have to wear wet jeans", optionB: "Always have to wear a heavy winter coat in summer" },
    { optionA: "Be able to sense whenever someone is lying", optionB: "Be able to sense whenever someone is attracted to you" },
    { optionA: "Have a pet dinosaur", optionB: "Have a pet unicorn" },
    { optionA: "Live in a world where everyone has a superpower except you", optionB: "Be the only person with a superpower in a normal world" },
    { optionA: "Only be able to listen to one song for the rest of your life", optionB: "Only be able to watch one movie for the rest of your life" },
    { optionA: "Have a permanent unibrow", optionB: "Have no eyebrows at all" },
    { optionA: "Be able to instantly master any skill you see on YouTube", optionB: "Be able to memorize any book you touch" },
    { optionA: "Have to fight a chicken every time you get into a car", optionB: "Have to fight a squirrel every time you open a door" },
    { optionA: "Be a famous writer but no one knows your face", optionB: "Be a famous influencer but no one knows your name" },
    { optionA: "Live without electricity for a month", optionB: "Live without running water for a week" },
    { optionA: "Have teeth made of diamonds", optionB: "Have hair made of gold" },
    { optionA: "Only be able to sleep for 2 hours at a time", optionB: "Only be able to sleep for 12 hours at a time" },
    { optionA: "Have the ability to erase people's memories of you", optionB: "Have the ability to see people's memories" },
    { optionA: "Always smell like a wet dog", optionB: "Always smell like old garlic" },
    { optionA: "Be the world's best singer but you're deaf", optionB: "Be the world's best painter but you're blind" },
    { optionA: "Have a tail that you can't control", optionB: "Have horns that grow when you're mad" },
    { optionA: "Always have to hop everywhere", optionB: "Always have to walk backwards" },
    { optionA: "Be able to talk to plants", optionB: "Be able to talk to machinery" },
    { optionA: "Live in a house made of glass", optionB: "Live in a house made of chocolate" },
    { optionA: "Have a magic fridge that never runs out of your favorite food", optionB: "Have a magic closet that always has the perfect outfit" },
    { optionA: "Be able to change the color of anything you touch", optionB: "Be able to change the temperature of anything you touch" },
    { optionA: "Always have a small cloud raining on you", optionB: "Always have a bright spotlight shining on you" },
    { optionA: "Be able to remember everything you’ve ever forgotten", optionB: "Be able to forget anything you want" },
    { optionA: "Only be able to wear clothes that are two sizes too small", optionB: "Only be able to wear clothes that are two sizes too big" },
    { optionA: "Have your voice sound like a cartoon character", optionB: "Have your voice sound like a robot" },
    { optionA: "Be able to turn into any animal", optionB: "Be able to turn into any object" },
    { optionA: "Always win at board games but lose at sports", optionB: "Always win at sports but lose at board games" },
    { optionA: "Have a private island but no way to leave", optionB: "Have a luxury jet but no place to land" },
    { optionA: "Be able to grow your hair to any length instantly", optionB: "Be able to change your eye color instantly" },
    { optionA: "Live in a world where it's always raining", optionB: "Live in a world where it's always snowing" },
    { optionA: "Have the power to heal others but you feel their pain", optionB: "Have the power to heal yourself but you take years off your life" },
    { optionA: "Only eat dessert for the rest of your life", optionB: "Only eat spicy food for the rest of your life" },
    { optionA: "Be an astronaut in a failing spaceship", optionB: "Be a deep-sea diver with a leaking tank" },
    { optionA: "Have a brain that works like a supercomputer", optionB: "Have a body that is indestructible" },
    { optionA: "Be the protagonist of a horror movie", optionB: "Be the villain of a comedy movie" },
    { optionA: "Always know when someone is talking about you", optionB: "Always know what people's first impression of you was" },
    { optionA: "Be unable to distinguish between a dream and reality", optionB: "Have every dream you have be a premonition of someone else's bad day" },
    { optionA: "Always feel like you're about to sneeze but never do", optionB: "Always feel like you have a hair on your tongue that you can't find" },
    { optionA: "Have a 10-second delay between your brain and your body's movements", optionB: "Have a 1-minute delay between what people say and when you hear it" },
    { optionA: "Only be able to sleep on a pile of damp laundry", optionB: "Only be able to sleep on a concrete floor covered in glitter" },
    { optionA: "Have a tiny, invisible person constantly whispering 'that's what you think' after every sentence you speak", optionB: "Have a tiny, invisible person constantly clapping sarcastically after you do anything productive" },
    { optionA: "Live in a world where everyone looks exactly like you", optionB: "Live in a world where you are the only one with a face" },
    { optionA: "Be able to see how many people have had a crush on you", optionB: "Be able to see how many people have actively disliked you at first sight" },
    { optionA: "Have to eat your favorite meal every single day for the rest of your life", optionB: "Never be able to eat your favorite meal again" },
    { optionA: "Always have your life soundtracked by a very bad middle school band", optionB: "Always have your life soundtracked by a heavy metal singer who only whispers" },
    { optionA: "Lose the ability to feel physical pain", optionB: "Lose the ability to feel emotional sadness" },
    { optionA: "Be able to talk to buildings and hear their history", optionB: "Be able to talk to shadows and hear what they’ve seen" },
    { optionA: "Have your skin be made of mirrors", optionB: "Have your skin be completely transparent" },
    { optionA: "Always have a pocket full of wet sand that you can’t empty", optionB: "Always have a single bee following you that never stings but never leaves" },
    { optionA: "Be the world's most talented person at a skill that no longer exists", optionB: "Be completely mediocre at everything but have the best luck in the world" },
    { optionA: "Have to pay $1 every time you use a swear word", optionB: "Have to apologize to every inanimate object you bump into" },
    { optionA: "Be able to detect any lie but you have to bark like a dog to alert others", optionB: "Be able to tell any lie perfectly but you lose a random memory every time you do" },
    { optionA: "Only be able to see in black and white", optionB: "Only be able to see things that are moving" },
    { optionA: "Have your life be directed by Wes Anderson", optionB: "Have your life be directed by Michael Bay" },
    { optionA: "Live in a house where every door is a different size and shape", optionB: "Live in a house where all the furniture is slightly too tall for you" },
    { optionA: "Be able to run on water but only while screaming at the top of your lungs", optionB: "Be able to fly but only as fast as you can crawl" },
    { optionA: "Have a photographic memory for things you hate", optionB: "Have no memory at all of the people you love" },
    { optionA: "Every time you laugh, you swap bodies with a random person for 30 seconds", optionB: "Every time you cry, it rains inside whatever room you are in" },
    { optionA: "Be a ghost who can watch anyone but never interact", optionB: "Be a statue that is conscious but can never move" },
    { optionA: "Have a third arm that is significantly shorter than the others", optionB: "Have a tail that wags whenever you’re lying" },
    { optionA: "Only be able to read books that are written in the future", optionB: "Only be able to read books that have been lost to history" },
    { optionA: "Always have to wear a heavy medieval suit of armor", optionB: "Always have to wear a full-body mascot costume" },
    { optionA: "Have a mouth that is permanently stained blue", optionB: "Have hair that changes color based on what you ate last" },
    { optionA: "Be able to teleport anywhere, but you arrive completely naked", optionB: "Be able to fly, but you have to flap your arms manually like a bird" },
    { optionA: "Never be able to use a fork or spoon again", optionB: "Never be able to use a towel or napkin again" },
    { optionA: "Be able to command a legion of squirrels", optionB: "Be able to negotiate with any insect" },
    { optionA: "Every movie you watch turns into a musical halfway through", optionB: "Every book you read has the last chapter missing" },
    { optionA: "Have to narrate your life like a 1940s noir detective", optionB: "Have to speak in rhyme whenever you are in a grocery store" },
    { optionA: "Always have a small amount of static electricity in your fingertips", optionB: "Always have a faint glow like a glow-stick in the dark" },
    { optionA: "Be able to smell fear", optionB: "Be able to hear people's insecurities" },
    { optionA: "Have your taste buds on your fingertips", optionB: "Have your ears on your elbows" },
    { optionA: "Only be able to drink liquids through a very long, bendy straw", optionB: "Only be able to eat food that has been blended into a smoothie" },
    { optionA: "Live in a world where it is always Golden Hour", optionB: "Live in a world where it is always a warm, summer night" },
    { optionA: "Be the reason for a new law being created", optionB: "Be the reason a historical monument is torn down" },
    { optionA: "Have a personal theme song that plays whenever you enter a room, but it’s played on a kazoo", optionB: "Have a spotlight follow you everywhere, but it’s only visible to people who dislike you" },
    { optionA: "Lose the ability to taste salt", optionB: "Lose the ability to taste sugar" },
    { optionA: "Be able to change the font of anything you read in real life", optionB: "Be able to see the 'stats' of every object (durability, weight, value)" },
    { optionA: "Have your thoughts appear as text bubbles above your head for 10 minutes a day", optionB: "Have your dreams broadcasted on a local TV channel once a week" },
    { optionA: "Be a master of every craft but have no creativity", optionB: "Be incredibly creative but have no motor skills to execute your ideas" },
    { optionA: "Only be able to use a flip phone from 2004", optionB: "Only be able to use a computer that takes 20 minutes to load a single page" },
    { optionA: "Have to walk on your hands for 1 hour every day", optionB: "Have to crawl everywhere when you’re inside your own home" },
    { optionA: "Be able to see 24 hours into the future, but only while you are asleep", optionB: "Be able to see 100 years into the future, but only regarding things that don't matter" },
    { optionA: "Always have sticky hands", optionB: "Always have itchy feet" },
    { optionA: "Know every secret of the universe but be unable to speak", optionB: "Be able to speak every language but know absolutely nothing about the world" },
    { optionA: "Have a nose that honks like a clown horn when you're surprised", optionB: "Have eyes that glow bright red when you're tired" },
    { optionA: "Always have to wear sunglasses, even indoors and at night", optionB: "Always have to wear earmuffs, even in the summer" },
    { optionA: "Be able to breathe fire, but only when you have a cold", optionB: "Be able to shoot lightning from your fingers, but it only powers a lightbulb" },
    { optionA: "Have your furniture constantly rearrange itself while you sleep", optionB: "Have your clothes change color randomly throughout the day" },
    { optionA: "Be the world's greatest liar but no one ever believes you", optionB: "Always tell the truth but everyone thinks you're joking" },
    { optionA: "Have a house that is 100% soundproof from the outside", optionB: "Have a house where the walls are made of library bookshelves" },
    { optionA: "Only be able to shower in freezing cold water", optionB: "Only be able to sleep on a bed of pinecones" },
    { optionA: "Have your age be determined by how you feel that day", optionB: "Have your age be fixed at 25 for 100 years, then you turn 125 instantly" },
    { optionA: "Be able to summon a rainstorm whenever you're sad", optionB: "Be able to make flowers grow whenever you're happy" },
    { optionA: "Always have the feeling that you've forgotten something important", optionB: "Always have the feeling that someone is standing right behind you" },
    { optionA: "Be able to talk to your pets, but they only talk about your flaws", optionB: "Be able to talk to your car, but it’s extremely judgmental of your driving" },
    { optionA: "Only be able to wear clothes made of paper", optionB: "Only be able to wear clothes made of heavy velvet" },
    { optionA: "Have to hop like a frog to get anywhere in a hurry", optionB: "Have to moonwalk whenever you’re trying to be serious" },
    { optionA: "Be able to rewind your life by one hour once a week", optionB: "Be able to fast-forward through any boring situation, but you have no memory of it" },
    { optionA: "Have a permanent 'kick me' sign on your back that you can't remove", optionB: "Have to wear a bell around your neck that jingles with every step" },
    { optionA: "Be able to see the world in slow motion at will", optionB: "Be able to see the world in thermal vision at will" },
    { optionA: "Have a head that is perfectly square", optionB: "Have a head that is perfectly transparent" },
    { optionA: "Never be able to use a blanket again", optionB: "Never be able to use a pillow again" },
    { optionA: "Have a personal assistant who is a ghost that only you can see", optionB: "Have a personal assistant who is a very intelligent but rude goat" },
    { optionA: "Always have your shoes on the wrong feet", optionB: "Always have your shirt on backwards" },
    { optionA: "Be able to control the weather but only in your immediate 5-foot radius", optionB: "Be able to control the stock market but only for companies you hate" },
    { optionA: "Only be able to eat foods that start with the letter 'P'", optionB: "Only be able to eat foods that are the color orange" },
    { optionA: "Have to sleep in a hammock forever", optionB: "Have to sleep in a bathtub (no water) forever" },
    { optionA: "Be able to instantly grow a beard of any length", optionB: "Be able to change the length of your fingernails at will" },
    { optionA: "Have a brain that is 10% faster than anyone else's but you lose 10% of your physical coordination", optionB: "Have a body that is 10% faster than anyone else's but you lose 10% of your IQ" },
    { optionA: "Be able to hear a conversation from a mile away but only if it's about you", optionB: "Be able to see through walls but only if they are painted yellow" },
    { optionA: "Always have blue skin", optionB: "Always have fur instead of skin" },
    { optionA: "Have to eat with giant chopsticks for every meal", optionB: "Have to eat with a tiny cocktail sword for every meal" },
    { optionA: "Be able to travel back in time to meet your parents as teenagers", optionB: "Be able to travel forward in time to meet your grandchildren" },
    { optionA: "Live in a world where everyone has to sing when they are happy", optionB: "Live in a world where everyone has to dance when they are angry" },
    { optionA: "Have a permanent smell of fresh baked bread follow you", optionB: "Have a permanent smell of rain on hot asphalt follow you" },
    { optionA: "Be able to walk on any surface (walls, ceilings)", optionB: "Be able to breathe anywhere (space, underwater, smoke)" },
    { optionA: "Have to use a different name every time you meet someone new", optionB: "Have to tell a secret every time you say hello" },
    { optionA: "Only be able to watch silent movies", optionB: "Only be able to listen to instrumental music" },
    { optionA: "Have your life be a continuous 24/7 livestream that you can't turn off", optionB: "Have your life be a secret that no one is allowed to know about" },
    { optionA: "Be able to understand what babies are thinking", optionB: "Be able to understand what elderly people are reminiscing about" },
    { optionA: "Have a nose that turns bright red when you're attracted to someone", optionB: "Have hands that sweat profusely when you're telling the truth" },
    { optionA: "Be able to turn any liquid into water", optionB: "Be able to turn any liquid into coffee" },
    { optionA: "Live in a house that is constantly floating 10 feet off the ground", optionB: "Live in a house that is constantly moving 1 mph to the west" },
    { optionA: "Have to wear flippers instead of shoes", optionB: "Have to wear a cape every time you leave the house" },
    { optionA: "Be able to see the ghosts of all the animals you've ever eaten", optionB: "Be able to see the ghosts of all the insects you've ever stepped on" },
    { optionA: "Always have a small pebble in your shoe that you can't remove", optionB: "Always have a loose thread on your clothes that you can't pull" },
    { optionA: "Be able to grow 2 feet taller at will", optionB: "Be able to shrink to 6 inches tall at will" },
    { optionA: "Only be able to communicate through post-it notes", optionB: "Only be able to communicate through a megaphone" },
    { optionA: "Have a permanent 1-second lag in your vision", optionB: "Have a permanent echo in everything you hear" },
    { optionA: "Live in a world where gravity is 20% weaker", optionB: "Live in a world where everyone can jump 10 feet high" },
    { optionA: "Be a famous philosopher whose work is misunderstood", optionB: "Be a famous artist whose work is hated but expensive" },
    { optionA: "Have to carry a heavy suitcase with you everywhere you go", optionB: "Have to wear a heavy backpack with you everywhere you go" },
    { optionA: "Be able to turn invisible but only when you are holding your breath", optionB: "Be able to fly but only while you are singing a song" },
    { optionA: "Always have the lights on in your house", optionB: "Always have the lights off in your house" },
    { optionA: "Have your memory wiped every 10 years", optionB: "Have your memory perfectly clear for every single moment of your life" },
    { optionA: "Be able to talk to your own organs", optionB: "Be able to talk to your own reflection" },
    { optionA: "Only be able to eat food that is crunchy", optionB: "Only be able to eat food that is soft" },
    { optionA: "Be able to make anyone laugh instantly", optionB: "Be able to make anyone fall asleep instantly" },
    { optionA: "Have a door that leads to a random place in the world in your bedroom", optionB: "Have a window that shows a random time in history in your living room" },
    { optionA: "Always have to speak in the third person", optionB: "Always have to speak in a fake accent" },
    { optionA: "Be able to know the history of any object you touch", optionB: "Be able to know the future of any object you touch" },
    { optionA: "Have to eat with your hands for the rest of your life", optionB: "Have to wear gloves for the rest of your life" },
    { optionA: "Always have to wake up at 4:00 AM", optionB: "Always have to go to bed at 7:00 PM" },
    { optionA: "Be able to summon any book to your hand instantly", optionB: "Be able to summon any snack to your hand instantly" },
    { optionA: "Have your thoughts projected on a screen for all to see", optionB: "Have your heart rate projected on a screen for all to see" },
    { optionA: "Be able to double jump in real life", optionB: "Be able to slide along the ground like a video game character" },
    { optionA: "Have a cat that acts like a dog", optionB: "Have a dog that acts like a cat" },
    { optionA: "Only be able to travel by bicycle", optionB: "Only be able to travel by boat" },
    { optionA: "Be able to see the air", optionB: "Be able to hear the sunlight" },
    { optionA: "Have a permanent sunburn on your nose", optionB: "Have a permanent brain freeze feeling" },
    { optionA: "Be able to turn your skin into metal", optionB: "Be able to turn your skin into rubber" },
    { optionA: "Always have to wear a hat", optionB: "Always have to wear a scarf" },
    { optionA: "Be able to control the growth of your hair", optionB: "Be able to control the growth of your height" },
    { optionA: "Have a pocket dimension in your jacket", optionB: "Have a bag that holds infinite items" },
    { optionA: "Only be able to watch movies once", optionB: "Only be able to listen to songs once" },
    { optionA: "Be able to talk to your future self", optionB: "Be able to talk to your past self" },
    { optionA: "Have to wear a wet swimsuit all day", optionB: "Have to wear a winter coat in a sauna" },
    { optionA: "Be able to change the color of the sky", optionB: "Be able to change the color of the grass" },
    { optionA: "Have a voice that sounds like a cello", optionB: "Have a voice that sounds like a flute" },
    { optionA: "Always have to run everywhere", optionB: "Always have to skip everywhere" },
    { optionA: "Be able to make objects float", optionB: "Be able to make objects change shape" },
    { optionA: "Only be able to read one page of a book per day", optionB: "Only be able to watch one minute of a movie per day" },
    { optionA: "Have a permanent smile on your face", optionB: "Have a permanent frown on your face" },
    { optionA: "Be able to taste colors", optionB: "Be able to see sounds" },
    { optionA: "Always have to wear your clothes inside out", optionB: "Always have to wear your clothes backwards" },
    { optionA: "Be able to summon a cloud to ride on", optionB: "Be able to summon a giant eagle to fly on" },
    { optionA: "Only be able to use a fountain pen", optionB: "Only be able to use a crayon" },
    { optionA: "Have a house that is a giant tree", optionB: "Have a house that is a giant mushroom" },
    { optionA: "Be able to change the size of your eyes", optionB: "Be able to change the size of your ears" },
    { optionA: "Always have to speak in a whisper", optionB: "Always have to speak in a shout" },
    { optionA: "Be able to turn into a cloud", optionB: "Be able to turn into a puddle" },
    { optionA: "Have a permanent glitter beard", optionB: "Have permanent glitter hair" },
    { optionA: "Only be able to wear one color for the rest of your life", optionB: "Only be able to wear clothes with patterns" },
    { optionA: "Be able to summon a rain cloud for someone else", optionB: "Be able to summon a sunbeam for someone else" },
    { optionA: "Have to wear a cape every day", optionB: "Have to wear a crown every day" },
    { optionA: "Be able to walk through fire", optionB: "Be able to walk on ice without slipping" },
    { optionA: "Only be able to use a compass for navigation", optionB: "Only be able to use the stars for navigation" },
    { optionA: "Have a house that is always at 60 degrees", optionB: "Have a house that is always at 80 degrees" },
    { optionA: "Be able to change your hair color with your mind", optionB: "Be able to change your eye color with your mind" },
    { optionA: "Always have to carry a balloon", optionB: "Always have to carry a rubber duck" },
    { optionA: "Be able to make flowers bloom by touching them", optionB: "Be able to make ice melt by touching it" },
    { optionA: "Only be able to talk to people who are taller than you", optionB: "Only be able to talk to people who are shorter than you" },
    { optionA: "Have a permanent tail", optionB: "Have permanent cat ears" },
    { optionA: "Be able to summon a warm breeze", optionB: "Be able to summon a cool breeze" },
    { optionA: "Only be able to wear wool", optionB: "Only be able to wear silk" },
    { optionA: "Have a house that is a giant teapot", optionB: "Have a house that is a giant shoe" },
    { optionA: "Be able to change the texture of any object", optionB: "Be able to change the weight of any object" },
    { optionA: "Always have to walk on your tiptoes", optionB: "Always have to walk with your knees bent" },
    { optionA: "Be able to talk to the moon", optionB: "Be able to talk to the sun" },
    { optionA: "Only be able to use a sundial", optionB: "Only be able to use an hourglass" },
    { optionA: "Have a permanent glowing aura", optionB: "Have permanent sparkling skin" },
    { optionA: "Be able to make any food taste like chocolate", optionB: "Be able to make any food taste like pizza" },
    { optionA: "Only be able to wear mismatched socks", optionB: "Only be able to wear mismatched shoes" },
    { optionA: "Have a house that is a giant library", optionB: "Have a house that is a giant greenhouse" },
    { optionA: "Be able to change the length of your shadow", optionB: "Be able to change the color of your shadow" },
    { optionA: "Always have to wear a bowtie", optionB: "Always have to wear a monocle" },
    { optionA: "Be able to summon a rainbow", optionB: "Be able to summon a fog" },
    { optionA: "Only be able to eat with a spoon", optionB: "Only be able to eat with a fork" },
    { optionA: "Have a house that is a giant castle", optionB: "Have a house that is a giant lighthouse" },
    { optionA: "Be able to talk to the ocean", optionB: "Be able to talk to the mountains" },
    { optionA: "Only be able to use a map", optionB: "Only be able to ask for directions" },
    { optionA: "Have a permanent floral scent", optionB: "Have a permanent pine scent" },
    { optionA: "Be able to make anyone smile", optionB: "Be able to make anyone laugh" },
    { optionA: "Only be able to wear stripes", optionB: "Only be able to wear polka dots" },
    { optionA: "Have a house that is a giant boat", optionB: "Have a house that is a giant plane" },
    { optionA: "Be able to change the volume of your voice at will", optionB: "Be able to change the pitch of your voice at will" },
    { optionA: "Always have to wear a watch", optionB: "Always have to wear a ring" },
    { optionA: "Be able to summon a firefly", optionB: "Be able to summon a butterfly" },
    { optionA: "Only be able to eat cold food", optionB: "Only be able to eat hot food" },
    { optionA: "Have a house that is a giant cave", optionB: "Have a house that is a giant nest" },
    { optionA: "Be able to talk to the wind", optionB: "Be able to talk to the rain" },
    { optionA: "Only be able to use a pencil", optionB: "Only be able to use a pen" },
    { optionA: "Have a permanent crown of flowers", optionB: "Have a permanent crown of leaves" },
    { optionA: "Be able to make any object glow", optionB: "Be able to make any object float" },
    { optionA: "Only be able to wear vintage clothes", optionB: "Only be able to wear futuristic clothes" },
    { optionA: "Have a house that is a giant clock", optionB: "Have a house that is a giant telescope" },
    { optionA: "Be able to change the season at will", optionB: "Be able to change the time of day at will" },
    { optionA: "Always have to wear a backpack", optionB: "Always have to wear a fanny pack" },
    { optionA: "Be able to summon a small breeze", optionB: "Be able to summon a small wave" },
    { optionA: "Only be able to eat breakfast food", optionB: "Only be able to eat dinner food" },
    { optionA: "Have a house that is a giant pyramid", optionB: "Have a house that is a giant sphere" },
    { optionA: "Be able to talk to the stars", optionB: "Be able to talk to the planets" },
    { optionA: "Only be able to use a quill", optionB: "Only be able to use a typewriter" },
    { optionA: "Have a permanent trail of glitter behind you", optionB: "Have a permanent trail of bubbles behind you" },
    { optionA: "Be able to make any object change color", optionB: "Be able to make any object change texture" },
    { optionA: "Only be able to wear velvet", optionB: "Only be able to wear denim" },
    { optionA: "Have a house that is a giant windmill", optionB: "Have a house that is a giant waterwheel" },
    { optionA: "Be able to change the taste of water", optionB: "Be able to change the smell of water" },
    { optionA: "Always have to wear a mask", optionB: "Always have to wear a cape" },
    { optionA: "Be able to summon a snowstorm", optionB: "Be able to summon a heatwave" },
    { optionA: "Only be able to eat with your left hand", optionB: "Only be able to eat with your right hand" },
    { optionA: "Have a house that is a giant balloon", optionB: "Have a house that is a giant kite" },
    { optionA: "Be able to talk to the earth", optionB: "Be able to talk to the sky" },
    { optionA: "Only be able to use a chalkboard", optionB: "Only be able to use a whiteboard" },
    { optionA: "Have a permanent scent of vanilla", optionB: "Have a permanent scent of cinnamon" },
    { optionA: "Be able to make any object bounce", optionB: "Be able to make any object slide" },
    { optionA: "Only be able to wear handmade clothes", optionB: "Only be able to wear designer clothes" },
    { optionA: "Have a house that is a giant shell", optionB: "Have a house that is a giant rock" },
    { optionA: "Be able to change the gravity in your room", optionB: "Be able to change the air pressure in your room" },
    { optionA: "Always have to wear a vest", optionB: "Always have to wear a belt" },
    { optionA: "Be able to summon a shooting star", optionB: "Be able to summon a northern light" },
    { optionA: "Only be able to eat spicy food", optionB: "Only be able to eat bland food" },
    { optionA: "Have a house that is a giant garden", optionB: "Have a house that is a giant aquarium" },
    { optionA: "Be able to talk to your furniture", optionB: "Be able to talk to your appliances" },
    { optionA: "Only be able to use a pager", optionB: "Only be able to use a telegram" },
    { optionA: "Have a permanent musical hum", optionB: "Have a permanent rhythmic beat" },
    { optionA: "Be able to make any object disappear", optionB: "Be able to make any object appear" },
    { optionA: "Only be able to wear neon colors", optionB: "Only be able to wear pastel colors" },
    { optionA: "Have a house that is a giant bridge", optionB: "Have a house that is a giant tunnel" },
    { optionA: "Be able to change the brightness of the sun", optionB: "Be able to change the phase of the moon" },
    { optionA: "Always have to wear a tie", optionB: "Always have to wear a necklace" },
    { optionA: "Be able to summon a small fire", optionB: "Be able to summon a small puddle" },
    { optionA: "Only be able to eat fruit", optionB: "Only be able to eat vegetables" },
    { optionA: "Have a house that is a giant station", optionB: "Have a house that is a giant airport" },
    { optionA: "Be able to talk to the trees", optionB: "Be able to talk to the grass" },
    { optionA: "Only be able to use a dictionary", optionB: "Only be able to use an encyclopedia" },
    { optionA: "Have a permanent soft glow", optionB: "Have a permanent soft hum" },
    { optionA: "Be able to make any object soft", optionB: "Be able to make any object hard" },
    { optionA: "Only be able to wear leather", optionB: "Only be able to wear lace" },
    { optionA: "Have a house that is a giant tower", optionB: "Have a house that is a giant dome" },
    { optionA: "Be able to change the flow of time", optionB: "Be able to change the speed of light" },
    { optionA: "Always have to wear a wig", optionB: "Always have to wear a beard" },
    { optionA: "Be able to summon a mist", optionB: "Be able to summon a dew" },
    { optionA: "Only be able to eat soup", optionB: "Only be able to eat salad" },
    { optionA: "Have a house that is a giant tent", optionB: "Have a house that is a giant cabin" },
    { optionA: "Be able to talk to the animals", optionB: "Be able to talk to the insects" },
    { optionA: "Only be able to use a radio", optionB: "Only be able to use a television" },
    { optionA: "Have a permanent scent of sea salt", optionB: "Have a permanent scent of mountain air" },
    { optionA: "Be able to make any object hot", optionB: "Be able to make any object cold" },
    { optionA: "Only be able to wear plaid", optionB: "Only be able to wear camo" },
    { optionA: "Have a house that is a giant box", optionB: "Have a house that is a giant jar" },
    { optionA: "Be able to change the color of your blood", optionB: "Be able to change the color of your sweat" },
    { optionA: "Always have to wear gloves", optionB: "Always have to wear a scarf" },
    { optionA: "Be able to summon a small bird", optionB: "Be able to summon a small fish" },
    { optionA: "Only be able to eat pasta", optionB: "Only be able to eat rice" },
    { optionA: "Have a house that is a giant tree", optionB: "Have a house that is a giant rock" },
    { optionA: "Be able to talk to your clothes", optionB: "Be able to talk to your shoes" },
    { optionA: "Only be able to use a map", optionB: "Only be able to use a compass" },
    { optionA: "Have a permanent scent of lavender", optionB: "Have a permanent scent of peppermint" },
    { optionA: "Be able to make any object heavy", optionB: "Be able to make any object light" },
    { optionA: "Only be able to wear patterns", optionB: "Only be able to wear solids" },
    { optionA: "Have a house that is a giant cube", optionB: "Have a house that is a giant pyramid" },
    { optionA: "Be able to change the density of your body", optionB: "Be able to change the temperature of your body" },
    { optionA: "Always have to wear a belt", optionB: "Always have to wear suspenders" },
    { optionA: "Be able to summon a small cloud", optionB: "Be able to summon a small sun" },
    { optionA: "Only be able to eat sweets", optionB: "Only be able to eat savory" },
    { optionA: "Have a house that is a giant ship", optionB: "Have a house that is a giant plane" },
    { optionA: "Be able to talk to your food", optionB: "Be able to talk to your drink" },
    { optionA: "Only be able to use a pen", optionB: "Only be able to use a pencil" },
    { optionA: "Have a permanent glow", optionB: "Have a permanent sparkle" },
    { optionA: "Be able to make any object grow", optionB: "Be able to make any object shrink" },
    { optionA: "Only be able to wear cotton", optionB: "Only be able to wear polyester" },
    { optionA: "Have a house that is a giant book", optionB: "Have a house that is a giant film" },
    { optionA: "Be able to change the color of your eyes", optionB: "Be able to change the color of your hair" },
    { optionA: "Always have to wear a hat", optionB: "Always have to wear a headband" },
    { optionA: "Be able to summon a small star", optionB: "Be able to summon a small moon" },
    { optionA: "Only be able to eat pizza", optionB: "Only be able to eat burgers" },
    { optionA: "Have a house that is a giant island", optionB: "Have a house that is a giant mountain" },
    { optionA: "Be able to talk to your reflection", optionB: "Be able to talk to your shadow" },
    { optionA: "Only be able to use a phone", optionB: "Only be able to use a computer" },
    { optionA: "Have a permanent scent of roses", optionB: "Have a permanent scent of lilies" },
    { optionA: "Be able to make any object move", optionB: "Be able to make any object stay" },
    { optionA: "Only be able to wear black", optionB: "Only be able to wear white" },
    { optionA: "Have a house that is a giant forest", optionB: "Have a house that is a giant ocean" },
    { optionA: "Be able to change the shape of your nose", optionB: "Be able to change the shape of your ears" },
    { optionA: "Always have to wear a watch", optionB: "Always have to wear a clock" },
    { optionA: "Be able to summon a small wind", optionB: "Be able to summon a small rain" },
    { optionA: "Only be able to eat tacos", optionB: "Only be able to eat sushi" },
    { optionA: "Have a house that is a giant park", optionB: "Have a house that is a giant beach" },
    { optionA: "Be able to talk to your heart", optionB: "Be able to talk to your brain" },
    { optionA: "Only be able to use a bike", optionB: "Only be able to use a car" },
    { optionA: "Have a permanent scent of coffee", optionB: "Have a permanent scent of tea" },
    { optionA: "Be able to make any object loud", optionB: "Be able to make any object quiet" },
    { optionA: "Only be able to wear silk", optionB: "Only be able to wear wool" },
    { optionA: "Have a house that is a giant museum", optionB: "Have a house that is a giant gallery" },
    { optionA: "Be able to change the length of your arms", optionB: "Be able to change the length of your legs" },
    { optionA: "Always have to wear a scarf", optionB: "Always have to wear a tie" },
    { optionA: "Be able to summon a small cat", optionB: "Be able to summon a small dog" },
    { optionA: "Only be able to eat apples", optionB: "Only be able to eat bananas" },
    { optionA: "Have a house that is a giant theater", optionB: "Have a house that is a giant stadium" },
    { optionA: "Be able to talk to your eyes", optionB: "Be able to talk to your ears" },
    { optionA: "Only be able to use a boat", optionB: "Only be able to use a plane" },
    { optionA: "Have a permanent scent of ocean", optionB: "Have a permanent scent of forest" },
    { optionA: "Be able to make any object fast", optionB: "Be able to make any object slow" },
    { optionA: "Only be able to wear gold", optionB: "Only be able to wear silver" },
    { optionA: "Have a house that is a giant castle", optionB: "Have a house that is a giant palace" },
    { optionA: "Be able to change the color of your teeth", optionB: "Be able to change the color of your nails" },
    { optionA: "Always have to wear a ring", optionB: "Always have to wear a bracelet" },
    { optionA: "Be able to summon a small bird", optionB: "Be able to summon a small lizard" },
    { optionA: "Only be able to eat bread", optionB: "Only be able to eat cheese" },
    { optionA: "Have a house that is a giant library", optionB: "Have a house that is a giant study" },
    { optionA: "Be able to talk to your lungs", optionB: "Be able to talk to your stomach" },
    { optionA: "Only be able to use a train", optionB: "Only be able to use a bus" },
    { optionA: "Have a permanent scent of lemon", optionB: "Have a permanent scent of orange" },
    { optionA: "Be able to make any object soft", optionB: "Be able to make any object hard" },
    { optionA: "Only be able to wear stripes", optionB: "Only be able to wear solids" },
    { optionA: "Have a house that is a giant tent", optionB: "Have a house that is a giant dome" },
    { optionA: "Be able to change the length of your fingers", optionB: "Be able to change the length of your toes" },
    { optionA: "Always have to wear a belt", optionB: "Always have to wear a sash" },
    { optionA: "Be able to summon a small frog", optionB: "Be able to summon a small turtle" },
    { optionA: "Only be able to eat soup", optionB: "Only be able to eat dry food" },
    { optionA: "Have a house that is a giant cave", optionB: "Have a house that is a giant hill" },
    { optionA: "Be able to talk to your fingers", optionB: "Be able to talk to your toes" },
    { optionA: "Only be able to use a scooter", optionB: "Only be able to use a skateboard" },
    { optionA: "Have a permanent scent of jasmine", optionB: "Have a permanent scent of lily" },
    { optionA: "Be able to make any object big", optionB: "Be able to make any object small" },
    { optionA: "Only be able to wear linen", optionB: "Only be able to wear spandex" },
    { optionA: "Have a house that is a giant ball", optionB: "Have a house that is a giant box" },
    { optionA: "Be able to change the width of your shoulders", optionB: "Be able to change the width of your hips" },
    { optionA: "Always have to wear a necklace", optionB: "Always have to wear a choker" },
    { optionA: "Be able to summon a small bug", optionB: "Be able to summon a small worm" },
    { optionA: "Only be able to eat hot dogs", optionB: "Only be able to eat hamburgers" },
    { optionA: "Have a house that is a giant tree", optionB: "Have a house that is a giant bush" },
    { optionA: "Be able to talk to your knees", optionB: "Be able to talk to your elbows" },
    { optionA: "Only be able to use a helicopter", optionB: "Only be able to use a jet" },
    { optionA: "Have a permanent scent of honey", optionB: "Have a permanent scent of sugar" },
    { optionA: "Be able to make any object bright", optionB: "Be able to make any object dim" },
    { optionA: "Only be able to wear lace", optionB: "Only be able to wear leather" },
    { optionA: "Have a house that is a giant flower", optionB: "Have a house that is a giant leaf" },
    { optionA: "Be able to change the height of your forehead", optionB: "Be able to change the height of your chin" },
    { optionA: "Always have to wear a cape", optionB: "Always have to wear a cloak" },
    { optionA: "Be able to summon a small cloud", optionB: "Be able to summon a small sun" },
    { optionA: "Only be able to eat cake", optionB: "Only be able to eat pie" },
    { optionA: "Have a house that is a giant cloud", optionB: "Have a house that is a giant star" },
    { optionA: "Be able to talk to your hair", optionB: "Be able to talk to your skin" },
    { optionA: "Only be able to use a tractor", optionB: "Only be able to use a mower" },
    { optionA: "Have a permanent scent of pine", optionB: "Have a permanent scent of cedar" },
    { optionA: "Be able to make any object rough", optionB: "Be able to make any object smooth" },
    { optionA: "Only be able to wear fur", optionB: "Only be able to wear feathers" },
    { optionA: "Have a house that is a giant nest", optionB: "Have a house that is a giant burrow" },
    { optionA: "Be able to change the size of your teeth", optionB: "Be able to change the size of your tongue" },
    { optionA: "Always have to wear a mask", optionB: "Always have to wear a veil" },
    { optionA: "Be able to summon a small fire", optionB: "Be able to summon a small ice" },
    { optionA: "Only be able to eat nuts", optionB: "Only be able to eat seeds" },
    { optionA: "Have a house that is a giant shell", optionB: "Have a house that is a giant pearl" },
    { optionA: "Be able to talk to your bones", optionB: "Be able to talk to your muscles" },
    { optionA: "Only be able to use a kayak", optionB: "Only be able to use a canoe" },
    { optionA: "Have a permanent scent of rain", optionB: "Have a permanent scent of snow" },
    { optionA: "Be able to make any object bounce", optionB: "Be able to make any object stick" },
    { optionA: "Only be able to wear stripes", optionB: "Only be able to wear dots" },
    { optionA: "Have a house that is a giant bridge", optionB: "Have a house that is a giant wall" },
    { optionA: "Be able to change the color of your eyes", optionB: "Be able to change the color of your lips" },
    { optionA: "Always have to wear a glove", optionB: "Always have to wear a mitten" },
    { optionA: "Be able to summon a small spark", optionB: "Be able to summon a small drop" },
    { optionA: "Only be able to eat chicken", optionB: "Only be able to eat beef" },
    { optionA: "Have a house that is a giant mountain", optionB: "Have a house that is a giant valley" },
    { optionA: "Be able to talk to your liver", optionB: "Be able to talk to your kidney" },
    { optionA: "Only be able to use a skateboard", optionB: "Only be able to use a surfboard" },
    { optionA: "Have a permanent scent of ocean", optionB: "Have a permanent scent of sand" },
    { optionA: "Be able to make any object sink", optionB: "Be able to make any object float" },
    { optionA: "Only be able to wear red", optionB: "Only be able to wear blue" },
    { optionA: "Have a house that is a giant pyramid", optionB: "Have a house that is a giant sphinx" },
    { optionA: "Be able to change the size of your waist", optionB: "Be able to change the size of your chest" },
    { optionA: "Always have to wear a ribbon", optionB: "Always have to wear a bow" },
    { optionA: "Be able to summon a small pebble", optionB: "Be able to summon a small leaf" },
    { optionA: "Only be able to eat carrots", optionB: "Only be able to eat celery" },
    { optionA: "Have a house that is a giant egg", optionB: "Have a house that is a giant nest" },
    { optionA: "Be able to talk to your feet", optionB: "Be able to talk to your hands" },
    { optionA: "Only be able to use a sled", optionB: "Only be able to use a ski" },
    { optionA: "Have a permanent scent of grass", optionB: "Have a permanent scent of dirt" },
    { optionA: "Be able to make any object tall", optionB: "Be able to make any object short" },
    { optionA: "Only be able to wear velvet", optionB: "Only be able to wear silk" },
    { optionA: "Have a house that is a giant ring", optionB: "Have a house that is a giant chain" },
    { optionA: "Be able to change the length of your neck", optionB: "Be able to change the length of your back" },
    { optionA: "Always have to wear a boot", optionB: "Always have to wear a sandal" },
    { optionA: "Be able to summon a small wave", optionB: "Be able to summon a small wind" },
    { optionA: "Only be able to eat grapes", optionB: "Only be able to eat berries" },
    { optionA: "Have a house that is a giant moon", optionB: "Have a house that is a giant sun" },
    { optionA: "Be able to talk to your blood", optionB: "Be able to talk to your cells" },
    { optionA: "Only be able to use a wagon", optionB: "Only be able to use a cart" },
    { optionA: "Have a permanent scent of musk", optionB: "Have a permanent scent of amber" },
    { optionA: "Be able to make any object clear", optionB: "Be able to make any object opaque" },
    { optionA: "Only be able to wear wool", optionB: "Only be able to wear cotton" },
    { optionA: "Have a house that is a giant bottle", optionB: "Have a house that is a giant glass" },
    { optionA: "Be able to change the size of your head", optionB: "Be able to change the size of your body" },
    { optionA: "Always have to wear a suit", optionB: "Always have to wear a dress" },
    { optionA: "Be able to summon a small cloud", optionB: "Be able to summon a small mist" },
    { optionA: "Only be able to eat fish", optionB: "Only be able to eat shrimp" },
    { optionA: "Have a house that is a giant wheel", optionB: "Have a house that is a giant gear" },
    { optionA: "Be able to talk to your soul", optionB: "Be able to talk to your mind" },
    { optionA: "Only be able to use a raft", optionB: "Only be able to use a tube" },
    { optionA: "Have a permanent scent of wood", optionB: "Have a permanent scent of metal" },
    { optionA: "Be able to make any object bendy", optionB: "Be able to make any object stiff" },
    { optionA: "Only be able to wear jeans", optionB: "Only be able to wear slacks" },
    { optionA: "Have a house that is a giant maze", optionB: "Have a house that is a giant room" },
    { optionA: "Be able to change the color of your skin", optionB: "Be able to change the color of your hair" },
    { optionA: "Always have to wear a vest", optionB: "Always have to wear a coat" },
    { optionA: "Be able to summon a small star", optionB: "Be able to summon a small planet" },
    { optionA: "Only be able to eat eggs", optionB: "Only be able to eat bacon" },
    { optionA: "Have a house that is a giant ship", optionB: "Have a house that is a giant plane" },
    { optionA: "Be able to talk to your shadow", optionB: "Be able to talk to your light" },
    { optionA: "Only be able to use a ferry", optionB: "Only be able to use a bridge" },
    { optionA: "Have a permanent scent of spice", optionB: "Have a permanent scent of herb" },
    { optionA: "Be able to make any object wet", optionB: "Be able to make any object dry" },
    { optionA: "Only be able to wear neon", optionB: "Only be able to wear gray" },
    { optionA: "Have a house that is a giant bubble", optionB: "Have a house that is a giant cube" },
    { optionA: "Be able to change the shape of your head", optionB: "Be able to change the shape of your hands" },
    { optionA: "Always have to wear a watch", optionB: "Always have to wear a ring" },
    { optionA: "Be able to summon a small rain", optionB: "Be able to summon a small snow" },
    { optionA: "Only be able to eat pasta", optionB: "Only be able to eat pizza" },
    { optionA: "Have a house that is a giant garden", optionB: "Have a house that is a giant park" },
    { optionA: "Be able to talk to your reflection", optionB: "Be able to talk to your shadow" },
    { optionA: "Only be able to use a car", optionB: "Only be able to use a bike" },
    { optionA: "Have a permanent scent of coffee", optionB: "Have a permanent scent of tea" },
    { optionA: "Be able to make any object loud", optionB: "Be able to make any object soft" },
    { optionA: "Only be able to wear black", optionB: "Only be able to wear white" },
    { optionA: "Have a house that is a giant museum", optionB: "Have a house that is a giant gallery" },
    { optionA: "Be able to change the length of your hair", optionB: "Be able to change the color of your skin" },
    { optionA: "Always have to wear a hat", optionB: "Always have to wear a scarf" },
    { optionA: "Be able to summon a small bird", optionB: "Be able to summon a small fish" },
    { optionA: "Only be able to eat apples", optionB: "Only be able to eat oranges" },
    { optionA: "Have a house that is a giant castle", optionB: "Have a house that is a giant lighthouse" },
    { optionA: "Be able to talk to your eyes", optionB: "Be able to talk to your ears" },
    { optionA: "Only be able to use a boat", optionB: "Only be able to use a plane" },
    { optionA: "Have a permanent scent of lavender", optionB: "Have a permanent scent of rose" },
    { optionA: "Be able to make any object fast", optionB: "Be able to make any object slow" },
    { optionA: "Only be able to wear patterns", optionB: "Only be able to wear solids" },
    { optionA: "Have a house that is a giant tree", optionB: "Have a house that is a giant rock" },
    { optionA: "Be able to change the color of your eyes", optionB: "Be able to change the color of your nails" },
    { optionA: "Always have to wear a belt", optionB: "Always have to wear suspenders" },
    { optionA: "Be able to summon a small cloud", optionB: "Be able to summon a small sun" },
    { optionA: "Only be able to eat soup", optionB: "Only be able to eat salad" },
    { optionA: "Have a house that is a giant box", optionB: "Have a house that is a giant ball" },
    { optionA: "Be able to talk to your hands", optionB: "Be able to talk to your feet" },
    { optionA: "Only be able to use a bus", optionB: "Only be able to use a train" },
    { optionA: "Have a permanent scent of pine", optionB: "Have a permanent scent of cedar" },
    { optionA: "Be able to make any object heavy", optionB: "Be able to make any object light" },
    { optionA: "Only be able to wear cotton", optionB: "Only be able to wear silk" },
    { optionA: "Have a house that is a giant dome", optionB: "Have a house that is a giant pyramid" },
    { optionA: "Be able to change the size of your teeth", optionB: "Be able to change the size of your tongue" },
    { optionA: "Always have to wear gloves", optionB: "Always have to wear a mask" },
    { optionA: "Be able to summon a small fire", optionB: "Be able to summon a small breeze" },
    { optionA: "Only be able to eat meat", optionB: "Only be able to eat bread" },
    { optionA: "Have a house that is a giant nest", optionB: "Have a house that is a giant shell" },
    { optionA: "Be able to talk to your lungs", optionB: "Be able to talk to your heart" },
    { optionA: "Only be able to use a ferry", optionB: "Only be able to use a bridge" },
    { optionA: "Have a permanent scent of rain", optionB: "Have a permanent scent of snow" },
    { optionA: "Be able to make any object bounce", optionB: "Be able to make any object slide" },
    { optionA: "Only be able to wear stripes", optionB: "Only be able to wear dots" },
    { optionA: "Have a house that is a giant bridge", optionB: "Have a house that is a giant tunnel" },
    { optionA: "Be able to change the color of your blood", optionB: "Be able to change the color of your sweat" },
    { optionA: "Always have to wear a ring", optionB: "Always have to wear a necklace" },
    { optionA: "Be able to summon a small cat", optionB: "Be able to summon a small dog" },
    { optionA: "Only be able to eat grapes", optionB: "Only be able to eat berries" },
    { optionA: "Have a house that is a giant mountain", optionB: "Have a house that is a giant valley" },
    { optionA: "Be able to talk to your liver", optionB: "Be able to talk to your kidney" },
    { optionA: "Only be able to use a skateboard", optionB: "Only be able to use a bike" },
    { optionA: "Have a permanent scent of orange", optionB: "Have a permanent scent of lemon" },
    { optionA: "Be able to make any object hot", optionB: "Be able to make any object cold" },
    { optionA: "Only be able to wear velvet", optionB: "Only be able to wear lace" },
    { optionA: "Have a house that is a giant egg", optionB: "Have a house that is a giant nest" },
    { optionA: "Be able to change the size of your head", optionB: "Be able to change the size of your hands" },
    { optionA: "Always have to wear a watch", optionB: "Always have to wear a clock" },
    { optionA: "Be able to summon a small bird", optionB: "Be able to summon a small fish" },
    { optionA: "Only be able to eat cheese", optionB: "Only be able to eat bread" },
    { optionA: "Have a house that is a giant tree", optionB: "Have a house that is a giant rock" },
    { optionA: "Be able to talk to your hair", optionB: "Be able to talk to your skin" },
    { optionA: "Only be able to use a map", optionB: "Only be able to use a compass" },
    { optionA: "Have a permanent scent of vanilla", optionB: "Have a permanent scent of spice" },
    { optionA: "Be able to make any object big", optionB: "Be able to make any object small" },
    { optionA: "Only be able to wear denim", optionB: "Only be able to wear leather" },
    { optionA: "Have a house that is a giant ring", optionB: "Have a house that is a giant cube" },
    { optionA: "Be able to change the length of your neck", optionB: "Be able to change the length of your back" },
    { optionA: "Always have to wear a boot", optionB: "Always have to wear a sandal" },
    { optionA: "Be able to summon a small wave", optionB: "Be able to summon a small wind" },
    { optionA: "Only be able to eat apples", optionB: "Only be able to eat bananas" },
    { optionA: "Have a house that is a giant moon", optionB: "Have a house that is a giant sun" },
    { optionA: "Be able to talk to your cells", optionB: "Be able to talk to your atoms" },
    { optionA: "Only be able to use a wagon", optionB: "Only be able to use a cart" },
    { optionA: "Have a permanent scent of musk", optionB: "Have a permanent scent of mint" },
    { optionA: "Be able to make any object clear", optionB: "Be able to make any object opaque" },
    { optionA: "Only be able to wear linen", optionB: "Only be able to wear wool" },
    { optionA: "Have a house that is a giant bottle", optionB: "Have a house that is a giant glass" },
    { optionA: "Be able to change the width of your shoulders", optionB: "Be able to change the width of your waist" },
    { optionA: "Always have to wear a tie", optionB: "Always have to wear a belt" },
    { optionA: "Be able to summon a small spark", optionB: "Be able to summon a small drop" },
    { optionA: "Only be able to eat chicken", optionB: "Only be able to eat fish" },
    { optionA: "Have a house that is a giant wheel", optionB: "Have a house that is a giant gear" },
    { optionA: "Be able to talk to your soul", optionB: "Be able to talk to your mind" },
    { optionA: "Only be able to use a raft", optionB: "Only be able to use a boat" },
    { optionA: "Have a permanent scent of wood", optionB: "Have a permanent scent of earth" },
    { optionA: "Be able to make any object stiff", optionB: "Be able to make any object bendy" },
    { optionA: "Only be able to wear patterns", optionB: "Only be able to wear solid colors" },
    { optionA: "Have a house that is a giant maze", optionB: "Have a house that is a giant room" },
    { optionA: "Be able to change the color of your teeth", optionB: "Be able to change the color of your eyes" },
    { optionA: "Always have to wear a scarf", optionB: "Always have to wear a cape" },
    { optionA: "Be able to summon a small star", optionB: "Be able to summon a small planet" },
    { optionA: "Only be able to eat pizza", optionB: "Only be able to eat pasta" },
    { optionA: "Have a house that is a giant forest", optionB: "Have a house that is a giant desert" },
    { optionA: "Be able to talk to your shadow", optionB: "Be able to talk to your light" },
    { optionA: "Only be able to use a bus", optionB: "Only be able to use a plane" },
    { optionA: "Have a permanent scent of fruit", optionB: "Have a permanent scent of flower" },
    { optionA: "Be able to make any object wet", optionB: "Be able to make any object dry" },
    { optionA: "Only be able to wear neon", optionB: "Only be able to wear pastel" },
    { optionA: "Have a house that is a giant bubble", optionB: "Have a house that is a giant cube" },
    { optionA: "Be able to change the shape of your nose", optionB: "Be able to change the shape of your ears" },
    { optionA: "Always have to wear a necklace", optionB: "Always have to wear a ring" },
    { optionA: "Be able to summon a small rain", optionB: "Be able to summon a small snow" },
    { optionA: "Only be able to eat cake", optionB: "Only be able to eat pie" },
    { optionA: "Have a house that is a giant garden", optionB: "Have a house that is a giant lake" },
    { optionA: "Be able to talk to your reflection", optionB: "Be able to talk to your shadow" },
    { optionA: "Only be able to use a bike", optionB: "Only be able to use a car" },
    { optionA: "Have a permanent scent of coffee", optionB: "Have a permanent scent of tea" },
    { optionA: "Be able to make any object loud", optionB: "Be able to make any object soft" },
    { optionA: "Only be able to wear white", optionB: "Only be able to wear black" },
    { optionA: "Have a house that is a giant gallery", optionB: "Have a house that is a giant museum" }
];

export const createGame = mutation({
    handler: async (ctx) => {
        function getRandomQuestions(arr: any[], count: number) {
            const shuffled = [...arr].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        const hostId = await getAuthUserId(ctx);
        if (!hostId) return null;
        const newGame = await ctx.db.insert("games", {
            hostId,
            code: Math.random().toString().substring(2, 8).toUpperCase(),
            started: false,
            questions: getRandomQuestions(questions, 10),
            voting: false,
            ended: false
        });
        await ctx.scheduler.runAfter(3600000, internal.games.deleteGameInternal, { 
            gameId: newGame 
        });
        return newGame;
    },
});

export const deleteGameInternal = internalMutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        await ctx.db.delete(gameId);
    },
});

export const getGameFromId = query({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;
        return game;
    },
});

export const joinGameFromCode = mutation({
    args: { 
        code: v.string(),
        name: v.string()
    },
    handler: async (ctx, { code, name }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;
        const game = await ctx.db
            .query("games")
            .withIndex("by_code", q => q.eq("code", code))
            .first();
        if (!game) return null;
        
        const players = game.players ?? [];
        if (!players.find(p => p.userId === userId)) {
            players.push({
                userId,
                name
            })
        }

        await ctx.db.patch(game._id, {
            players
        })

        return game._id;
    }
})

export const deleteGame = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        await ctx.db.delete(gameId);
    }
})

export const leaveGame = mutation({
    args: { 
        gameId: v.id("games"),
        userId: v.id("users")  
    },
    handler: async (ctx, { gameId, userId }) => {
        const user = await ctx.db.get(userId);
        if (!user) return null;

        const game = await ctx.db.get(gameId);
        if (!game) return null;

        const newPlayers = game?.players?.filter(player => player.userId !== user._id);

        await ctx.db.patch(game._id, {
            players: newPlayers,
        });

        return { success: true };
    },
});

export const startGame = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, { 
            started: true,
            questionIndex: 0,
            voting: true,
        })
    }
})

export const submitAnswer = mutation({
    args: {
        gameId: v.id("games"),
        questionIndex: v.number(),
        option: v.union(v.literal("A"), v.literal("B")),
    },
    handler: async (ctx, { gameId, questionIndex, option }) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;

        const game = await ctx.db.get(gameId);
        if (!game) return null;

        const question = game.questions?.[questionIndex];
        if (!question) return null;

        const votesA = question.votesA ?? [];
        const votesB = question.votesB ?? [];

        if (votesA.includes(userId) || votesB.includes(userId)) {
            return null;
        }

        const questions = [...(game.questions ?? [])];
        const currentQuestion = questions[questionIndex];

        if (option === "A") {
            currentQuestion.votesA = [...votesA, userId];
        }

        if (option === "B") {
            currentQuestion.votesB = [...votesB, userId];
        }

        questions[questionIndex] = currentQuestion;

        await ctx.db.patch(gameId, {
            questions,
        });
    },
});

export const revealVotes = mutation({
    args: { gameId: v.id("games") },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: false
        })
    }
});

export const nextQuestion = mutation({
    args: { gameId: v.id("games"), },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: true,
            questionIndex: (game.questionIndex ?? 0) + 1
        })
    }
})

export const endGame = mutation({
    args: { gameId: v.id("games"), },
    handler: async (ctx, { gameId }) => {
        const game = await ctx.db.get(gameId);
        if (!game) return null;

        await ctx.db.patch(game._id, {
            voting: false,
            ended: true
        })
    }
});

export const getPlayer = query({
    args: {
        gameId: v.id("games"),
        userId: v.id("users"),
    },
    handler: async (ctx, { gameId, userId }) => {
        const game = await ctx.db.get(gameId);

        const user = await ctx.db.get(userId);

        const player = await game?.players?.find(player => player.userId === user?._id);

        return player;

    }
})

export const getGameFromCode = mutation({
    args: { code: v.string() },
    handler: async (ctx, { code }) => {
        const game = await ctx.db
            .query("games")
            .withIndex("by_code", q => q.eq("code", code))
            .first();
        if (!game) return null;
        return game._id;
    }
})