const wordList = [
    // FOOD
    {
        word: "egg",
        hint: "A round or oval object laid by a hen, often eaten fried or boiled.",
        category: "food"
    },
    {
        word: "ham",
        hint: "A type of meat that comes from the back leg of a pig, usually cured or smoked.",
        category: "food"
    },
    {
        word: "pie",
        hint: "A baked dish consisting of a crust with a sweet or savory filling inside.",
        category: "food"
    },
    {
        word: "bun",
        hint: "A small, round, sweet or plain bread roll, often used for burgers or sandwiches.",
        category: "food"
    },
    {
        word: "jam",
        hint: "A thick, sweet spread made by boiling fruit with sugar.",
        category: "food"
    },
    {
        word: "tea",
        hint: "A hot or cold drink made by soaking dried leaves in water.",
        category: "food"
    },
    {
        word: "soy",
        hint: "A type of bean used to make milk, sauce, or tofu.",
        category: "food"
    },
    {
        word: "oat",
        hint: "A type of grain often used to make porridge or healthy breakfast bars.",
        category: "food"
    },
    {
        word: "pea",
        hint: "A small, round, green vegetable that grows in a pod.",
        category: "food"
    },
    {
        word: "banana",
        hint: "A yellow fruit that monkeys love.",
        category: "food"
    },
    {
        word: "bubblegum",
        hint: "Chewy and pink, fun to blow into bubbles.",
        category: "food"
    },
    {
        word: "jellybean",
        hint: "A small, sweet, and colorful candy.",
        category: "food"
    },
    {
        word: "cupcake",
        hint: "A small, delicious cake often topped with frosting.",
        category: "food"
    },
    {
        word: "gummybear",
        hint: "A chewy, fruity treat shaped like a bear.",
        category: "food"
    },
    {
        word: "muffin",
        hint: "A small, sweet bread often with fruit or nuts.",
        category: "food"
    },
    {
        word: "lollipop",
        hint: "A sweet candy on a stick, often brightly colored.",
        category: "food"
    },
    {
        word: "sprinkle",
        hint: "Tiny bits of candy or decoration.",
        category: "food"
    },
    {
        word: "cookie",
        hint: "A sweet baked treat, often chocolate chip.",
        category: "food"
    },
    {
        word: "pizza",
        hint: "A flat, circular dough topped with tomato sauce, cheese, and various toppings.",
        category: "food"
    },
    {
        word: "noodle",
        hint: "A long, thin strip of pasta or dough, often served in soups or stir-fries.",
        category: "food"
    },
    {
        word: "cookie",
        hint: "A small, flat, sweet baked treat, often containing chocolate chips or nuts.",
        category: "food"
    },
    {
        word: "pancake",
        hint: "A thin, flat, round cake made from batter and cooked on a griddle or pan.",
        category: "food"
    },
    {
        word: "dumpling",
        hint: "A small mass of dough wrapped around a filling, typically boiled, steamed, or fried.",
        category: "food"
    },
    {
        word: "popcorn",
        hint: "A snack made by heating corn kernels until they puff up and explode.",
        category: "food"
    },
    {
        word: "sausage",
        hint: "A cylindrical meat product usually made from ground meat, spices, and a casing.",
        category: "food"
    },
    {
        word: "spinach",
        hint: "A leafy green vegetable that is famous for being nutrient-rich and eaten raw or cooked.",
        category: "food"
    },
    {
        word: "sandwich",
        hint: "Two or more slices of bread with a filling such as meat, cheese, or vegetables between them.",
        category: "food"
    },
    {
        word: "spaghetti",
        hint: "A long, thin, solid string-shaped pasta, traditionally served with tomato or meat sauce.",
        category: "food"
    },
    {
        word: "hamburger",
        hint: "A grilled beef patty served in a bun, often topped with lettuce, tomato, and onion.",
        category: "food"
    },
    {
        word: "cheesecake",
        hint: "A rich, creamy dessert with a thick top layer made of soft cheese and a graham cracker or cookie crust.",
        category: "food"
    },
    {
        word: "blueberry",
        hint: "A small, round, indigo-colored fruit that is sweet and often used in muffins or pancakes.",
        category: "food"
    },
    {
        word: "strawberry",
        hint: "A bright red, heart-shaped fruit with tiny seeds on the outside and a sweet, juicy flavor.",
        category: "food"
    },
    {
        word: "chocolate",
        hint: "A sweet, dark brown food prepared from roasted cacao seeds, commonly sold in bars or used as a coating.",
        category: "food"
    },
    {
        word: "mayonnaise",
        hint: "A thick, creamy white dressing made from oil, egg yolks, and vinegar or lemon juice.",
        category: "food"
    },
    {
        word: "cappuccino",
        hint: "An Italian coffee drink prepared with equal parts double espresso, steamed milk, and milk foam.",
        category: "food"
    },
    {
        word: "pineapple",
        hint: "A large tropical fruit with a tough, spiky outer shell and sweet, yellow flesh inside.",
        category: "food"
    },

    // SPORT
    {
        word: "baseball",
        hint: "A team sport played with a bat and ball.",
        category: "sport"
    },
    {
        word: "swimming",
        hint: "Moving through water using arms and legs.",
        category: "sport"
    },
    {
        word: "soccer",
        hint: "A team sport played with a spherical ball that players kick into a rectangular goal.",
        category: "sport"
    },
    {
        word: "tennis",
        hint: "A racket sport played individually or in pairs on a rectangular court divided by a net.",
        category: "sport"
    },
    {
        word: "cycling",
        hint: "The activity of riding a bicycle for transport, recreation, or racing.",
        category: "sport"
    },
    {
        word: "golf",
        hint: "A sport where players use various clubs to hit a small ball into a series of holes in as few strokes as possible.",
        category: "sport"
    },
    {
        word: "judo",
        hint: "A modern Japanese martial art and combat sport that emphasizes throwing or tripping an opponent to the ground.",
        category: "sport"
    },
    {
        word: "surf",
        hint: "The act of riding on the forward face of a moving wave, typically toward the shore, while standing on a board.",
        category: "sport"
    },
    {
        word: "ski",
        hint: "A method of traveling over snow using long, flat runners attached to boots, often involving sliding down a mountain.",
        category: "sport"
    },
    {
        word: "hockey",
        hint: "A game played on ice or a field where players use curved sticks to hit a puck or ball into a goal.",
        category: "sport"
    },
    {
        word: "boxing",
        hint: "A combat sport in which two people wearing protective gloves throw punches at each other in a ring.",
        category: "sport"
    },
    {
        word: "skating",
        hint: "Moving across a surface (ice or pavement) using metal blades or wheels attached to boots.",
        category: "sport"
    },
    {
        word: "running",
        hint: "The action of moving rapidly on foot, used in various track and field events or marathons.",
        category: "sport"
    },
    {
        word: "fencing",
        hint: "A sport of centered around swordplay, where competitors use a foil, épée, or sabre to score points.",
        category: "sport"
    },
    {
        word: "handball",
        hint: "A fast-paced team sport where players pass a ball using their hands to throw it into the goal of the other team.",
        category: "sport"
    },
    {
        word: "basketball",
        hint: "A game played by two teams of five players on a rectangular court, usually involving shooting a ball through a raised hoop.",
        category: "sport"
    },
    {
        word: "volleyball",
        hint: "A team sport in which two teams are separated by a high net and try to ground a ball on the opponent's side.",
        category: "sport"
    },
    {
        word: "badminton",
        hint: "A racket sport played using rackets to hit a shuttlecock across a net.",
        category: "sport"
    },
    {
        word: "skateboard",
        hint: "An action sport that involves riding and performing tricks using a narrow board with four wheels.",
        category: "sport"
    },
    {
        word: "gymnastics",
        hint: "A sport involving the performance of exercises requiring physical strength, flexibility, power, agility, and balance.",
        category: "sport"
    },
    {
        word: "weightlifting",
        hint: "A sport in which the athlete attempts a maximum-weight single lift of a barbell loaded with weight plates.",
        category: "sport"
    },
    {
        word: "snowboarding",
        hint: "A winter sport that involves descending a snow-covered slope on a single board attached to the rider's feet.",
        category: "sport"
    },

    // ANIMAL
    {
        word: "penguin",
        hint: "A flightless bird that loves the cold.",
        category: "animal"
    },
    {
        word: "firefly",
        hint: "A tiny insect that glows in the dark.",
        category: "animal"
    },
    {
        word: "giraffe",
        hint: "A tall African mammal with a long neck.",
        category: "animal"
    },
    {
        word: "dolphin",
        hint: "An intelligent marine mammal that lives in water.",
        category: "animal"
    },
    {
        word: "butterfly",
        hint: "A colorful insect with four wings.",
        category: "animal"
    },
    {
        word: "elephant",
        hint: "A large mammal with a trunk and big ears.",
        category: "animal"
    },
    {
        word: "lion",
        hint: "A large carnivorous cat, king of the jungle.",
        category: "animal"
    },
    {
        word: "rabbit",
        hint: "A small furry animal with long ears.",
        category: "animal"
    },
    {
        word: "eagle",
        hint: "A large bird of prey with sharp talons.",
        category: "animal"
    },
    {
        word: "zebra",
        hint: "A striped African horse-like animal.",
        category: "animal"
    },
    {
        word: "cat",
        hint: "A small, furry pet known for meowing, purring, and catching mice.",
        category: "animal"
    },
    {
        word: "dog",
        hint: "Often called man's best friend, this loyal pet enjoys barks and walks.",
        category: "animal"
    },
    {
        word: "bat",
        hint: "A nocturnal flying mammal that uses echolocation to navigate in the dark.",
        category: "animal"
    },
    {
        word: "ant",
        hint: "A tiny, hardworking insect that lives in large colonies and can lift many times its weight.",
        category: "animal"
    },
    {
        word: "bee",
        hint: "A buzzing insect that collects nectar to make honey and helps pollinate flowers.",
        category: "animal"
    },
    {
        word: "cow",
        hint: "A large farm animal that grazes on grass and provides milk.",
        category: "animal"
    },
    {
        word: "fox",
        hint: "A clever, bushy-tailed wild animal known for its reddish fur and sharp pointed ears.",
        category: "animal"
    },
    {
        word: "owl",
        hint: "A bird of prey with large eyes and a rotating head, active mostly at night.",
        category: "animal"
    },
    {
        word: "pig",
        hint: "A stout farm animal with a snout, known for wallowing in mud to stay cool.",
        category: "animal"
    },
    {
        word: "yak",
        hint: "A long-haired, bulky bovine found in the mountains of Central Asia.",
        category: "animal"
    },
    {
        word: "eel",
        hint: "A long, snake-like fish that lives in both freshwater and the ocean.",
        category: "animal"
    },
    {
        word: "tiger",
        hint: "A large, orange wild cat with black stripes that is native to Asia.",
        category: "animal"
    },
    {
        word: "horse",
        hint: "A strong, four-legged animal used for riding, racing, and pulling carts.",
        category: "animal"
    },
    {
        word: "rabbit",
        hint: "A small mammal with long ears and a fluffy tail that loves to hop and eat carrots.",
        category: "animal"
    },
    {
        word: "monkey",
        hint: "A clever primate known for climbing trees, swinging by its tail, and eating bananas.",
        category: "animal"
    },
    {
        word: "donkey",
        hint: "A sturdy animal related to the horse, often used for carrying heavy loads.",
        category: "animal"
    },
    {
        word: "panda",
        hint: "A large black-and-white bear from China that primarily eats bamboo.",
        category: "animal"
    },
    {
        word: "koala",
        hint: "A grey, tree-dwelling marsupial from Australia that eats eucalyptus leaves.",
        category: "animal"
    },
    {
        word: "turtle",
        hint: "A slow-moving reptile with a hard, protective shell that it can retract into.",
        category: "animal"
    },
    {
        word: "parrot",
        hint: "A colorful bird capable of mimicking human speech and other sounds.",
        category: "animal"
    },
    {
        word: "dolphin",
        hint: "A highly intelligent marine mammal known for its playful nature and jumping out of water.",
        category: "animal"
    },
    {
        word: "leopard",
        hint: "A powerful wild cat with a yellowish coat covered in dark, rosette-shaped spots.",
        category: "animal"
    },
    {
        word: "hamster",
        hint: "A small, popular pet rodent that often stores food in its large cheek pouches.",
        category: "animal"
    },
    {
        word: "Crocodile",
        hint: "A large, predatory reptile with a long snout and powerful jaws that lives in tropical water.",
        category: "animal"
    },
    {
        word: "kangaroo",
        hint: "A large Australian marsupial with strong hind legs for hopping and a pouch for carrying its young.",
        category: "animal"
    },
    {
        word: "chimpanzee",
        hint: "A highly intelligent African ape, closely related to humans, known for using tools and complex social behavior.",
        category: "animal"
    },
    {
        word: "rattlesnake",
        hint: "A venomous snake with a segmented tail that makes a buzzing sound when threatened.",
        category: "animal"
    },
    {
        word: "grasshopper",
        hint: "A jumping insect with long hind legs and wings that can make a chirping sound by rubbing its legs together.",
        category: "animal"
    },
    {
        word: "orangutan",
        hint: "A large, long-haired reddish-orange ape found in the rainforests of Southeast Asia.",
        category: "animal"
    },
    {
        word: "hippopotamus",
        hint: "A massive, thick-skinned African mammal that spends most of its day submerged in water.",
        category: "animal"
    },
    {
        word: "platypus",
        hint: "A unique, egg-laying mammal from Australia with a bill like a duck and a tail like a beaver.",
        category: "animal"
    },
    {
        word: "chameleon",
        hint: "A specialized lizard known for its ability to change color and its long, sticky tongue used to catch insects.",
        category: "animal"
    },
];
