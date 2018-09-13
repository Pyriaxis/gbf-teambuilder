# GBF Team Builder

[![Granblue Fantasy](https://i0.wp.com/animevo.moe/wordpress/wp-content/uploads/2018/04/logo_gbf.png?w=840&ssl=1)](http://game.granbluefantasy.jp/)

GBF Team Builder is a standalone web app that will help novice and intermediate players build their frontline of 4 characters (1 MC + 3 Crew) within an element. As team optimization in GBF is quite a bit more complex than number crunching, it's suggestions may not be directly useful to veteran and end-game players, and they are encouraged to use this app as a basis for further analysis.

---
## Features

  - Customize the MC and select 3 other characters and get a team rating broken down into Attack, Survivability and Utility Score
  - At a glance see exactly what each member brings to a team.
  - See how well each member fares compared to one another in terms of attack or utility.
  - Easily see missing gaps in your team composition and fix it.

## Calculations
**Individual Auto Attack Power**
`Base Attack Power (20) * Normal Attack Mod * Unique Attack Mod * MA Mod * Crit Mod * Echo Mod`

**Individual Ougi Attack Power**
`Base Ougi Power (90) * Normal Attack Mod * Unique Attack Mod * Crit Mod * Ougi Spec Up Mod * Ougi Echo Mod` 

**Final Team Attack Power**
`Sum (Individual Attack Power) * (Def Down + Ele down) + Nukes`

**Final Team Survival Score**
`(Base + Heal + Shield) * (Atk Down + Ele down) * Blind * Charm + Dmg Cuts + Para + Superfear`

**Final Team Utility Score**
`Veil + Clear + Debuff Success + Fear + Gravity`

## Assumptions
The scoring done by the Teambuilder is based on the following assumptions:
- Attacks and Ougis don't  cap (est. 220k AA / 1 million Ougi).
- All Skill Damage will cap.
- Battles last for infinite amount of turns (for purpose of calculating buff uptime).
- Stacking buffs are counted at near-to or at full power.
- No help from other players (no additional debuffs/buffs, basically)
- No influence from MH Ougi, Summons, Weaponskills
- No existing Normal Mod (and hence Normal ATK Up is currently overvalued)
- No damage cap for purposes of calculating score (but higher is always better)
- Complex skills are broken down into simple components as far as possible and scored.
---
### Development & Collaboration

See something inaccurate or have a feature to suggest? PM **/u/winterscaze** on the GBF Subreddit, post directly on Github, or even better, implement it and do a pull request!


GBF Team Builder is built upon create-react-app, which simply requires node v8+ and npm to install and run.

**All Images and art owned by Cygames (株式会社Cygames)**
