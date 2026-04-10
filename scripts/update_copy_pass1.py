#!/usr/bin/env python3
import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "data" / "products.json"
data = json.loads(path.read_text(encoding="utf-8"))

updates = {
    "pet-n-pet-biodegradable-bags": {
        "tagline": "Our pick for daily bag duty.",
        "problem": "Who it is for: dog owners who walk several times a day and hate flimsy poop bags. Who should skip: anyone willing to trade durability for the very cheapest rolls.",
        "solution": "These thicker bags separate cleanly from the roll and hold up better when you are tying off a full bag in bad weather. Bulk packs also cut the chance that you run out at the door.",
        "verdict": "Buy these for reliable daily walks - just store the rolls somewhere cool and dry.",
    },
    "chomchom-roller": {
        "tagline": "Our pick for sofa and upholstery fur.",
        "problem": "Who it is for: pet owners fighting hair on sofas, bedding, and fabric car seats. Who should skip: anyone who mostly needs to clean hard floors or leather.",
        "solution": "The reusable roller lifts embedded fur from woven fabric without burning through sticky sheets. A few quick passes before guests arrive does more than most lint rollers.",
        "verdict": "This is the upholstery tool we recommend first - it is far less useful on leather or large floor areas.",
    },
    "petlibro-automatic-feeder": {
        "tagline": "Our pick for scheduled dry-food meals.",
        "problem": "Who it is for: cats and dogs that do better on fixed meal times when you are not always home. Who should skip: pets that need wet food or owners who want app control.",
        "solution": "The feeder dispenses measured dry-food portions on a timer so breakfast and dinner land when they should. That helps with weight control and takes the panic out of late evenings.",
        "verdict": "Buy it for dependable dry-food schedules - just confirm your kibble size fits the chute.",
    },
    "casfuy-dog-nail-grinder": {
        "tagline": "Our pick for quieter at-home nail trims.",
        "problem": "Who it is for: dog owners who want smoother nails without the stress of clippers. Who should skip: anyone unwilling to train slowly around the grinder noise.",
        "solution": "The rotary grinder removes a little nail at a time, which makes it easier to stop before the quick. Multiple speed settings help you match the tool to a nervous dog.",
        "verdict": "A strong first grinder for home trims - only if you are willing to use treats and short sessions.",
    },
    "self-cleaning-slicker-brush": {
        "tagline": "Our pick for easier routine brushing.",
        "problem": "Who it is for: owners who brush often enough to care about cleanup time after every session. Who should skip: pets with tight mats that need a dematting tool or groomer.",
        "solution": "The self-cleaning button pushes trapped hair off the pins in one motion, so you are more likely to brush regularly. That matters more than the feature list on most basic slickers.",
        "verdict": "Worth it for faster cleanup between brushing sessions - not a shortcut around serious matting.",
    },
    "surefeed-microchip-pet-feeder": {
        "tagline": "Our pick for multi-pet meal theft.",
        "problem": "Who it is for: multi-pet homes where one animal keeps stealing another's food. Who should skip: single-pet homes that only need a basic bowl.",
        "solution": "The lid opens for the registered microchip or RFID tag and stays shut for everyone else. That makes prescription diets, portion control, and wet-food meals much easier to manage.",
        "verdict": "This is the fix we recommend for food stealing - the price only makes sense when you truly need the access control.",
    },
    "bissell-pet-hair-eraser-handheld": {
        "tagline": "Our pick for stairs, sofas, and car seats.",
        "problem": "Who it is for: pet owners who need a fast vacuum for upholstery, stairs, and boot liners. Who should skip: anyone hoping a handheld will replace a full-size vacuum.",
        "solution": "The motorized brush lifts embedded hair from fabric where upright vacuums struggle to reach. Because it is small and ready to grab, you are more likely to use it before fur builds up.",
        "verdict": "Buy it as a second vacuum for fabric trouble spots - not as your only machine.",
    },
    "outward-hound-dog-brick-puzzle": {
        "tagline": "Our pick for intermediate dog puzzle play.",
        "problem": "Who it is for: food-motivated dogs that need mental work beyond a bowl or snuffle mat. Who should skip: heavy chewers that attack plastic instead of solving it.",
        "solution": "The sliding covers and flip lids make dogs work for each treat, which stretches out dinner and uses their nose. It is a good step up once simpler puzzles stop being a challenge.",
        "verdict": "One of the better mid-level puzzles we recommend - supervise dogs that try to chew through the game.",
    },
    "chuckit-sport-ball-launcher": {
        "tagline": "Our pick for longer fetch with less effort.",
        "problem": "Who it is for: ball dogs whose humans get tired before they do. Who should skip: owners who rarely play fetch or dislike carrying a launcher on walks.",
        "solution": "The long handle adds leverage for bigger throws and lets you scoop up a slimy ball without touching it. That keeps fetch going longer with less strain on your arm.",
        "verdict": "An easy upgrade for regular fetch routines - just match the ball size to the launcher cup.",
    },
    "ruffwear-front-range-harness": {
        "tagline": "Our pick for everyday walking and light hikes.",
        "problem": "Who it is for: dogs that need a secure, comfortable harness for daily walks and weekend trails. Who should skip: owners who want the strongest no-pull front-clip training tool above all else.",
        "solution": "The padded Y-front shape spreads pressure more evenly than many cheap harnesses, and the two leash points give you options. It is built well enough for repeated use, not just occasional walks.",
        "verdict": "This is the harness we would buy for frequent walking - but only after measuring chest and girth carefully.",
    },
    "gel-cooling-mat-dogs": {
        "tagline": "Our pick for low-fuss hot-weather relief.",
        "problem": "Who it is for: pets that seek out tile floors when the house heats up. Who should skip: strong chewers or anyone expecting medical-grade cooling.",
        "solution": "The pressure-activated gel surface feels cooler than bedding without cords, freezer packs, or setup. That makes it easy to move between crates, cars, and shady corners.",
        "verdict": "Useful warm-weather comfort without much effort - it does not replace shade, water, or climate control.",
    },
    "outward-hound-fun-feeder-slo-bowl": {
        "tagline": "Our pick for slowing fast eaters.",
        "problem": "Who it is for: dogs that inhale meals and are done before you fill your own cup of tea. Who should skip: flat-faced breeds that struggle with deeper maze patterns.",
        "solution": "The ridges force smaller bites and make dogs work around the bowl instead of gulping straight down the middle. It works with dry or wet food and needs almost no maintenance.",
        "verdict": "Our default slow feeder for most dogs - choose the maze depth with your dog's face shape in mind.",
    },
    "furminator-deshedding-tool-medium": {
        "tagline": "Our pick for heavy undercoat shedding.",
        "problem": "Who it is for: double-coated dogs that drop undercoat all over the house every week. Who should skip: owners who brush too aggressively or dogs with irritated skin.",
        "solution": "The edge pulls loose undercoat that ordinary brushes miss, which cuts what ends up on sofas and clothing. Used lightly, it saves you from chasing fur around the house every day.",
        "verdict": "Worth the money for serious shedders - misuse it and you can irritate the coat or skin.",
    },
    "thundershirt-classic-anxiety": {
        "tagline": "Our pick for a first try at pressure calming.",
        "problem": "Who it is for: dogs that unravel during fireworks, storms, travel, or similar stress spikes. Who should skip: owners expecting any wrap to solve severe anxiety on its own.",
        "solution": "The snug wrap applies even pressure around the torso, which some dogs find settling in the same way swaddling can help babies. It is simple to test before moving to costlier interventions.",
        "verdict": "A sensible first calming tool to try - results vary a lot by dog, so keep expectations realistic.",
    },
    "jw-hol-ee-roller-dog-toy": {
        "tagline": "Our pick for one toy that does several jobs.",
        "problem": "Who it is for: dogs that enjoy fetch, tug, and treat-stuffing in the same play session. Who should skip: power chewers that tear soft rubber apart.",
        "solution": "The open lattice makes it easy to stuff with fabric or treats, and the ball shape still works for tossing and tugging. That gives you more variety than a standard ball for the same money.",
        "verdict": "Great value for moderate chewers who like mixed play - not the toy to leave with dedicated shredders.",
    },
    "earth-rated-dog-wipes": {
        "tagline": "Our pick for muddy paws and quick cleanups.",
        "problem": "Who it is for: owners who need to clean paws, bums, or coats between baths. Who should skip: pets with skin problems that need medicated products, not general wipes.",
        "solution": "These thicker dog-safe wipes are easier to use at the door than wet paper towels or scented baby wipes. They are most useful when walks keep ending with muddy feet on the floor.",
        "verdict": "Keep them by the door for easy cleanup - they are for maintenance, not full bathing.",
    },
    "ifetch-automatic-ball-launcher": {
        "tagline": "Our pick for automated indoor fetch.",
        "problem": "Who it is for: small to medium dogs that love fetch and humans whose shoulder gives out first. Who should skip: sound-sensitive dogs or homes without space for repeated ball launches.",
        "solution": "The launcher throws mini balls on a short arc so dogs can keep playing even when you stop throwing. With a little training, some dogs learn to reload it themselves.",
        "verdict": "Fun for fetch-obsessed dogs that accept the noise - it only pays off if your dog actually likes the machine.",
    },
    "kong-extreme-large-dog-toy": {
        "tagline": "Our pick for harder-chewing KONG fans.",
        "problem": "Who it is for: dogs that tear through the red KONG Classic too quickly. Who should skip: owners who have not already tested whether a standard KONG is enough.",
        "solution": "The denser black rubber lasts longer with strong jaws but still works with the same stuff-and-freeze routine. That makes it the obvious step up instead of switching to a totally different toy.",
        "verdict": "Buy this when the Classic stops lasting - it is tougher, not indestructible.",
    },
    "petsafe-smart-feed-wifi": {
        "tagline": "Our pick for app-controlled dry-food feeding.",
        "problem": "Who it is for: owners who want to adjust feeding times or portions from their phone. Who should skip: anyone feeding wet food or wanting a feeder that works well without Wi-Fi.",
        "solution": "The app lets you change schedules remotely and trigger meals when plans change. That is more flexible than a basic timer if your routine is never quite the same each day.",
        "verdict": "Best for households that will use the app controls - still plan around outages and kibble-size limits.",
    },
    "oneisall-dog-grooming-clippers": {
        "tagline": "Our pick for between-groomer coat trims.",
        "problem": "Who it is for: owners keeping coats tidy between professional grooms. Who should skip: pets with dense mats that really need a pro clipper and table.",
        "solution": "The cordless kit makes it easier to tidy legs, body hair, and problem patches without fighting a cord. Guard combs help beginners keep things even enough between appointments.",
        "verdict": "A practical maintenance kit for home touch-ups - not the answer to badly matted coats.",
    },
    "outward-hound-daypak-backpack": {
        "tagline": "Our pick for dogs that can carry a light trail load.",
        "problem": "Who it is for: fit adult dogs joining longer walks or day hikes. Who should skip: puppies, seniors, or dogs with mobility issues.",
        "solution": "The saddlebag design spreads a light load across both sides so dogs can carry water or bags without throwing off their balance. That can add a little purpose on longer walks.",
        "verdict": "A good first dog backpack for hikes - only load it lightly and fit it carefully.",
    },
    "chuckit-ultra-ball": {
        "tagline": "Our pick for a better everyday fetch ball.",
        "problem": "Who it is for: dogs that play fetch often enough to destroy or sand down normal tennis balls. Who should skip: heavy chewers that sit and gnaw instead of retrieving.",
        "solution": "The rubber core and bright shell hold up better than standard tennis balls and fit Chuckit launchers properly. They are also easier to spot in grass and mud.",
        "verdict": "Our default fetch-ball upgrade - still replace it once the surface starts to crack.",
    },
    "simplehuman-pet-food-can": {
        "tagline": "Our pick for premium dry-food storage.",
        "problem": "Who it is for: owners who want kibble sealed, tidy, and presentable in an open kitchen. Who should skip: anyone who just needs the cheapest bulk bin in the garage.",
        "solution": "The steel can seals more tightly than torn food bags and keeps the scoop where you need it. It is the kind of container that stays on show instead of being hidden away.",
        "verdict": "Worth it when storage lives in the kitchen - the price is hard to justify for utility-room use.",
    },
    "wobble-wag-giggle-ball": {
        "tagline": "Our pick for noisy, self-propelled floor play.",
        "problem": "Who it is for: dogs that stay engaged when a toy makes noise as it rolls. Who should skip: households with thin walls or dogs that spook at sudden sound.",
        "solution": "The internal tube design makes noise without batteries, so the toy gets attention as it bumps across the floor. That can keep a ball-motivated dog busy without treats or charging.",
        "verdict": "Fun for dogs that like sound and motion - much less appealing if you or your dog hate noise.",
    },
}

updated = 0
for product in data["products"]:
    fields = updates.get(product["slug"])
    if not fields:
        continue
    product.update(fields)
    updated += 1

path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(updated)
