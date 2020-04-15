package fr.openrpg.model.domain.rpg

enum class SkillType(val actionMask: Byte) {
    ATHLETICS(11),
    BURGLARY(8),
    CONTACTS(11),
    CRAFTS(3),
    DECEIVE(11),
    DRIVE(11),
    EMPATHY(11),
    FIGHT(15),
    INVESTIGATE(3),
    LORE(3),
    NOTICE(11),
    PHYSIQUE(11),
    PROVOKE(7),
    RAPPORT(11),
    RESOURCES(3),
    SHOOT(7),
    STEALTH(11),
    WILL(11)
}