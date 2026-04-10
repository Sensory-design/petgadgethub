#!/usr/bin/env python3
import json
from pathlib import Path

path = Path(__file__).resolve().parents[1] / "data" / "products.json"
data = json.loads(path.read_text(encoding="utf-8"))

updates = {
    "petlibro-stainless-fountain": {
        "tagline": "Our pick for picky cat hydration.",
        "problem": "Who it is for: indoor cats on dry food that walk past a still water bowl. Who should skip: anyone unwilling to clean a fountain every week.",
        "solution": "The stainless top is easier to keep sanitary than scratched plastic, and the moving water nudges many cats to drink more. Keep the pump clean and it stays quiet enough for most living rooms.",
        "verdict": "Our default fountain for cats that need a hydration nudge - but only if you will keep up with cleaning.",
    },
    "kasa-smart-pet-cam": {
        "tagline": "Our pick for pan-tilt pet-room check-ins.",
        "problem": "Who it is for: renters and first-time camera buyers who want to scan a whole room without drilling. Who should skip: anyone who needs long free cloud history.",
        "solution": "The pan-tilt camera lets you check multiple pet zones from one shelf and pairs with a straightforward app setup. That makes it more flexible than a fixed camera at the same price.",
        "verdict": "A sensible value pick for full-room check-ins - just budget for cloud storage if you want history.",
    },
    "tractive-gps-dog-6": {
        "tagline": "Our pick for live GPS on escape-risk dogs.",
        "problem": "Who it is for: dogs that might slip a gate, harness, or lead and owners who want a live map on their phone. Who should skip: anyone unwilling to pay the ongoing subscription.",
        "solution": "The tracker gives you live location, virtual fences, and the kind of battery behavior you can plan around. It works best as backup to training and secure handling, not as a substitute for either.",
        "verdict": "Buy it for the lost-dog scenario - and treat the subscription as part of the product price.",
    },
    "tractive-gps-cat-tracker": {
        "tagline": "Our pick for roaming cats that vanish fast.",
        "problem": "Who it is for: outdoor cats that disappear beyond shouting distance. Who should skip: cats that will never tolerate a collar or owners unwilling to pay the subscription.",
        "solution": "The lightweight tracker gives you live location and virtual fence alerts from the app, which is far better than guessing once a cat misses dinner. It is most useful for cats that already wear collars comfortably.",
        "verdict": "Worth it for true roamers - only if your cat will keep the collar on.",
    },
    "furbo-360-dog-camera": {
        "tagline": "Our pick for treat-toss check-ins.",
        "problem": "Who it is for: dog owners who want to see the whole room and reward calm behavior remotely. Who should skip: anyone who does not need treat tossing or dislikes subscription upsells.",
        "solution": "The rotating camera covers more of the room than a fixed lens, and the treat toss gives you a real reward tool instead of only a speaker. That is what separates it from a basic indoor cam.",
        "verdict": "The pet camera to buy when remote rewards matter - just check which features sit behind the subscription.",
    },
    "airtag-pet-collar-holder": {
        "tagline": "Our pick for mounting an AirTag on a collar.",
        "problem": "Who it is for: owners who already use AirTags and want a cheap backup locator on a collar. Who should skip: anyone who needs true live GPS in rural areas.",
        "solution": "The silicone holder keeps the AirTag tight against the collar so it is less likely to flap, snag, or fall off. That makes Find My more useful as a backup layer for near-home escapes.",
        "verdict": "A smart low-cost backup for town and suburb pets - not a substitute for real GPS.",
    },
    "dogrook-vibration-bark-collar": {
        "tagline": "Our pick for a no-shock bark interruption trial.",
        "problem": "Who it is for: owners who want to try vibration before any harsher bark-control method. Who should skip: fearful dogs or anyone looking for a collar to replace training.",
        "solution": "The collar uses sound and vibration to interrupt the barking loop without a shock setting. That can help on nuisance barking if the dog is sensitive to vibration and you also work on the trigger.",
        "verdict": "Reasonable only as a training aid - do not expect it to solve fear barking on its own.",
    },
    "petsfit-airline-pet-carrier": {
        "tagline": "Our pick for under-seat pet travel.",
        "problem": "Who it is for: cat and small-dog owners flying in cabin or doing frequent train and car trips. Who should skip: pets already taller than the airline's under-seat allowance.",
        "solution": "The soft-sided frame, ventilation panels, and multiple openings make security checks and long waits easier than a rigid box. It also folds down better when the trip is over.",
        "verdict": "A strong cabin-travel option - measure both the pet and the airline limit before you buy.",
    },
    "bonza-collapsible-travel-bowl": {
        "tagline": "Our pick for clipped-on trail water.",
        "problem": "Who it is for: dog owners who hike, camp, or travel light and still need an easy water stop. Who should skip: anyone with giant breeds that empty a small bowl in seconds.",
        "solution": "The silicone bowl folds flat against a bag and pops open fast at breaks, so you actually bring it. That is better than improvising with cups or your hand on a hot walk.",
        "verdict": "Easy to carry and easy to use - just check the volume if your dog drinks heavily.",
    },
    "blink-mini-indoor-camera": {
        "tagline": "Our pick for basic budget room checks.",
        "problem": "Who it is for: owners who want a cheap indoor camera for crates, doors, or food bowls. Who should skip: anyone wanting pan-tilt coverage or pet-specific features.",
        "solution": "The compact plug-in camera gives you live view, motion alerts, and two-way audio without much setup. It works best when you only need eyes on one predictable spot.",
        "verdict": "A good low-cost room camera - but it stays a basic fixed-lens option.",
    },
    "dog-car-seat-hammock-cover": {
        "tagline": "Our pick for protecting the back seat.",
        "problem": "Who it is for: drivers hauling muddy, shedding dogs in the back seat every week. Who should skip: anyone who wants crash protection rather than upholstery protection.",
        "solution": "The hammock blocks dirt, hair, and wet paws from covering the whole bench while helping keep dogs from falling into the footwell. Mesh-window versions also help dogs see you on the drive.",
        "verdict": "Buy it to save the seats - then pair it with a real crash-tested restraint.",
    },
    "petcube-cam-wifi": {
        "tagline": "Our pick for straightforward pet-room check-ins.",
        "problem": "Who it is for: owners who want a simple pet camera without paying for a treat dispenser. Who should skip: anyone needing 2K pan-tilt coverage or a free long cloud history.",
        "solution": "The compact camera covers the basics: live view, night vision, two-way audio, and motion alerts in a pet-focused app. That is enough for sofa checks, crate checks, and seeing who made the mess.",
        "verdict": "A solid mid-tier pet cam - just confirm the subscription terms and Wi-Fi band support.",
    },
    "petsafe-gentle-leader-headcollar": {
        "tagline": "Our pick for reducing hard leash pulling.",
        "problem": "Who it is for: dogs that drag on walks and owners willing to do a real acclimation period. Who should skip: anyone wanting a no-training instant fix.",
        "solution": "The headcollar redirects the nose, which reduces pulling leverage more effectively than a flat collar. It works best when you introduce it slowly with treats, not by snapping it on and marching out.",
        "verdict": "One of the better tools for serious pullers - only if you commit to gradual training.",
    },
    "catit-flower-fountain": {
        "tagline": "Our pick for a cheaper first cat fountain.",
        "problem": "Who it is for: cat owners who want to test moving water before paying for stainless steel. Who should skip: anyone who already knows they dislike cleaning plastic fountains.",
        "solution": "The compact fountain offers a few flow styles and a low enough price that it is easy to try. It is a practical first step if your cat ignores bowls but you are not ready for a premium model.",
        "verdict": "A good starter fountain - upgrade later if you want easier long-term cleaning.",
    },
    "wyze-cam-v3-indoor-outdoor": {
        "tagline": "Our pick for low-cost multi-camera coverage.",
        "problem": "Who it is for: owners who want several cameras on a budget for crates, doors, and pet rooms. Who should skip: anyone who needs premium privacy controls or hates subscription upsells.",
        "solution": "The v3 gives you 1080p video, color night vision, and a low per-camera cost, so covering more than one angle is realistic. That matters more than fancy features when you are watching multiple pet zones.",
        "verdict": "Best when you want several decent cameras cheaply - expect some app and subscription compromises.",
    },
    "drinkwell-platinum-fountain": {
        "tagline": "Our pick for higher-capacity fountain needs.",
        "problem": "Who it is for: multi-pet homes or thirsty pets that empty smaller fountains too quickly. Who should skip: anyone short on floor space or unwilling to clean a larger plastic unit.",
        "solution": "The bigger reservoir means fewer refills, and the free-falling stream keeps water moving for pets that prefer it. It makes more sense once a small fountain starts running low too often.",
        "verdict": "A practical step up for busier water stations - just make space for the footprint.",
    },
    "halti-optifit-headcollar": {
        "tagline": "Our pick when standard headcollars fit poorly.",
        "problem": "Who it is for: dogs that slip, twist, or rub out of simpler headcollars. Who should skip: owners whose dog already walks well in a basic harness.",
        "solution": "The extra adjustment points let you tune the fit around the nose and cheeks more precisely than simpler halters. That makes it useful for dogs that fall between standard shapes.",
        "verdict": "Best as a fit upgrade over simpler headcollars - patience still matters more than hardware.",
    },
    "sherpa-original-deluxe-carrier": {
        "tagline": "Our pick for a proven soft-sided cabin carrier.",
        "problem": "Who it is for: frequent travelers who want a known, under-seat-style carrier for small pets. Who should skip: owners guessing at fit instead of measuring pet and airline limits.",
        "solution": "The structured sides, fleece base, and multiple openings make it easier to load a nervous pet and manage check-in. It is popular because it solves the basic cabin-travel problem without becoming bulky.",
        "verdict": "A dependable soft carrier for frequent trips - but airline size rules still decide the outcome.",
    },
    "petsafe-scoopfree-ultra-litter-box": {
        "tagline": "Our pick for hands-off crystal-litter scooping.",
        "problem": "Who it is for: owners who want to cut daily scooping and can live with tray refills. Who should skip: cats that hate covered boxes, crystal litter, or motor noise.",
        "solution": "The rake clears waste into a covered compartment on a timer, and the hood helps contain scatter around the tray. It is built specifically for disposable crystal trays, so the running cost is part of the deal.",
        "verdict": "Worth it only if your cat accepts the system - budget for trays before you commit.",
    },
    "petcube-bites-2-lite": {
        "tagline": "Our pick for remote treat tossing on a budget.",
        "problem": "Who it is for: owners who want to reward or distract a pet remotely without paying Furbo prices. Who should skip: anyone who does not need treat tossing or hates hopper maintenance.",
        "solution": "The camera gives you live video, two-way audio, and app-triggered treat tossing in one box. That lets you do more than passively watch a bored dog from work.",
        "verdict": "A good treat-camera value pick - just use the right treat size and expect some subscription nudges.",
    },
    "arlo-essential-indoor-camera": {
        "tagline": "Our pick for indoor camera privacy control.",
        "problem": "Who it is for: owners who want a pet camera in a bedroom or other private room. Who should skip: anyone who does not care about a physical shutter and just wants the cheapest lens.",
        "solution": "The built-in privacy shutter gives a real off state when you are home, while the camera still covers the basics on 1080p video, alerts, and night vision. That makes it more comfortable for mixed human-pet spaces.",
        "verdict": "Strong when privacy matters as much as pet monitoring - long cloud history still costs extra.",
    },
    "greenies-teenie-dental-treats": {
        "tagline": "Our pick for small-dog dental chews.",
        "problem": "Who it is for: small dogs that will actually chew rather than gulp a dental treat whole. Who should skip: dogs that swallow chews too fast or need a strict calorie plan.",
        "solution": "The Teenie size gives small dogs a daily chew that can help reduce plaque as part of a broader dental routine. It is easier to stick with than brushing for owners who know they will not brush every day.",
        "verdict": "A reasonable dental default for small dogs - only if your dog chews properly and you count the calories.",
    },
    "kurgo-tru-fit-crash-tested-harness": {
        "tagline": "Our pick for car trips plus walks.",
        "problem": "Who it is for: owners who want one harness for everyday walks and safer car restraint. Who should skip: anyone unwilling to double-check the exact crash-tested SKU and fit guide.",
        "solution": "The padded harness works on leash and pairs with the seat-belt attachment for road trips, which is more versatile than buying a separate car-only restraint. The value is in the documented testing, not just the hardware.",
        "verdict": "Buy it for the testing paperwork and dual use - fit matters more than brand name here.",
    },
    "petmate-ultra-vari-kennel": {
        "tagline": "Our pick for airline-style hard-crate travel.",
        "problem": "Who it is for: pets that need a sturdy hard crate for cargo travel, recovery, or vehicle transport. Who should skip: anyone hoping a hard kennel will fit under a cabin seat.",
        "solution": "The rigid shell, vent pattern, and metal door match what most people expect from a standard airline-style kennel. It is the safer route when soft carriers are not allowed or not strong enough.",
        "verdict": "The hard crate we would start with for cargo-style travel - check airline hardware rules before the trip.",
    },
    "levoit-core-300-air-purifier": {
        "tagline": "Our pick for small-room pet dander control.",
        "problem": "Who it is for: owners dealing with litter dust, dander, or dog smell in bedrooms and pet rooms. Who should skip: anyone expecting one small purifier to clean an entire house.",
        "solution": "The compact purifier is easy to place near litter boxes or beds and cycles small-room air enough to reduce the stuff you notice day to day. That makes it useful as a targeted room fix, not a whole-home solution.",
        "verdict": "A sensible purifier for pet-heavy rooms - only if you size it to the room and replace filters.",
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
