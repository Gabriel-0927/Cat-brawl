document.addEventListener('DOMContentLoaded', () => {
    // --- 遊戲數據與配置 ---
    const ALL_UNITS = { 'cat_basic': { name: '小貓', icon: '😼', rarity: 'N', hp: 100, atk: 10, range: 40, speed: 2, cost: 50 }, 'cat_tank': { name: '坦克貓', icon: '😾', rarity: 'N', hp: 300, atk: 5, range: 35, speed: 1, cost: 75 }, 'cat_crusader': { name: '十字軍貓', icon: '🛡️', rarity: 'N', hp: 250, atk: 12, range: 40, speed: 1.2, cost: 100, blockChance: 0.2 }, 'cat_ninja': { name: '忍者貓', icon: '🥷', rarity: 'N', hp: 80, atk: 15, range: 40, speed: 3, cost: 60 }, 'cat_axe': { name: '斧頭貓', icon: '😺', rarity: 'R', hp: 150, atk: 25, range: 45, speed: 1.5, cost: 120 }, 'cat_magic': { name: '法師貓', icon: '🧙', rarity: 'R', hp: 90, atk: 20, range: 200, speed: 1.2, cost: 200 }, 'cat_freeze': { name: '冷凍貓', icon: '🧊', rarity: 'R', hp: 120, atk: 15, range: 150, speed: 1.5, cost: 280, freeze: { chance: 0.3, duration: 2000 } }, 'cat_samurai': { name: '武士貓', icon: '👺', rarity: 'R', hp: 200, atk: 30, range: 45, speed: 1.8, cost: 180, crit: { chance: 0.1, multiplier: 3 } }, 'cat_miner': { name: '礦工貓', icon: '⛏️', rarity: 'R', hp: 180, atk: 20, range: 40, speed: 1.5, cost: 220, moneyOnKill: { chance: 0.25, amount: 100 } }, 'cat_assassin': { name: '刺客貓', icon: '🗡️', rarity: 'R', hp: 100, atk: 10, range: 40, speed: 3.5, cost: 160, multiHit: { count: 2, delay: 100 } }, 'cat_archer': { name: '弓箭貓', icon: '🏹', rarity: 'R', hp: 100, atk: 18, range: 180, speed: 1.3, cost: 250 }, 'cat_boxer': { name: '拳擊貓', icon: '🥊', rarity: 'R', hp: 220, atk: 40, range: 38, speed: 1.6, cost: 260, knockback: { chance: 0.3 } }, 'cat_king': { name: '獅王貓', icon: '🦁', rarity: 'SSR', hp: 500, atk: 50, range: 60, speed: 1, cost: 400 }, 'cat_dragon': { name: '龍騎士貓', icon: '🐉', rarity: 'SSR', hp: 350, atk: 70, range: 150, speed: 1.5, cost: 550, splashRange: 50 }, 'cat_healer': { name: '治癒貓', icon: '🙏', rarity: 'SSR', hp: 200, atk: 5, range: 120, speed: 1.2, cost: 300, heal: 20 }, 'cat_valkyrie': { name: '女武神貓', icon: '💃', rarity: 'SSR', hp: 400, atk: 40, range: 50, speed: 3, cost: 600, attackInterval: 1000 }, 'cat_gunslinger': { name: '槍手貓', icon: '🤠', rarity: 'SSR', hp: 300, atk: 25, range: 160, speed: 1.5, cost: 500, multiHit: { count: 3, delay: 150 } }, 'cat_bard': { name: '吟遊詩人貓', icon: '🎵', rarity: 'SSR', hp: 250, atk: 0, range: 150, speed: 1.2, cost: 450, attackBuff: { radius: 150, multiplier: 1.2, duration: 5000 } }, 'cat_paladin': { name: '聖騎士貓', icon: '⚜️', rarity: 'SSR', hp: 600, atk: 60, range: 130, speed: 1, cost: 650, splashRange: 30, weaken: { chance: 0.2, multiplier: 0.7, duration: 3000 } }, 'cat_demolitionist': { name: '爆破專家貓', icon: '💣', rarity: 'SSR', hp: 250, atk: 100, range: 160, speed: 1.2, cost: 700, splashRange: 120 }, 'cat_alchemist': { name: '煉金貓', icon: '🧪', rarity: 'SSR', hp: 280, atk: 20, range: 140, speed: 1.3, cost: 620, poison: { chance: 0.4, damage: 15, duration: 5000 } }, 'cat_guardian': { name: '守護貓', icon: '🛡️', rarity: 'SSR', hp: 800, atk: 25, range: 40, speed: 0.8, cost: 500, damageReduction: { chance: 0.3, multiplier: 0.5 } }, 'cat_shaman': { name: '薩滿貓', icon: '🧿', rarity: 'SSR', hp: 300, atk: 35, range: 170, speed: 1.1, cost: 580, curse: { chance: 0.25, duration: 4000 } }, 'cat_mecha': { name: '機械貓神', icon: '🤖', rarity: 'UR', hp: 1200, atk: 150, range: 180, speed: 2, cost: 1200, splashRange: 70 }, 'cat_timelord': { name: '時空貓', icon: '⏳', rarity: 'UR', hp: 800, atk: 80, range: 100, speed: 1, cost: 1500, timeStop: { chance: 0.15, duration: 2500 } }, 'cat_cosmic_dragon': { name: '宇宙龍貓', icon: '☄️', rarity: 'UR', hp: 1500, atk: 180, range: 200, speed: 1, cost: 1800, splashRange: 80, weaken: { chance: 0.3, multiplier: 0.5, duration: 5000 } }, 'cat_sun_god': { name: '太陽神貓', icon: '☀️', rarity: 'UR', hp: 2000, atk: 250, range: 180, speed: 0.8, cost: 2500, waveAttack: { chance: 0.3, distance: 250 } }, 'cat_necromancer': { name: '死靈法師貓', icon: '💀', rarity: 'UR', hp: 900, atk: 100, range: 160, speed: 1, cost: 1600, summonOnKill: { chance: 0.5, unitId: 'minion_skeleton' } }, 'cat_behemoth': { name: '巨獸貓', icon: '🦣', rarity: 'UR', hp: 3000, atk: 200, range: 50, speed: 0.6, cost: 2200, barrier: 1 }, 'minion_skeleton': { name: '骷髏兵', icon: '🦴', rarity: 'N', hp: 50, atk: 20, range: 30, speed: 2, cost: 0, isMinion: true, lifeSpan: 10000 } };
    const ENEMY_UNITS = { 'doge': { name: '狗狗', icon: '🐶', hp: 80, atk: 10, range: 30, speed: 1.5 }, 'snake': { name: '蛇蛇', icon: '🐍', hp: 120, atk: 20, range: 80, speed: 1 }, 'bat': { name: '蝙蝠', icon: '🦇', hp: 50, atk: 15, range: 100, speed: 2.5 }, 'bear': { name: '熊熊', icon: '🐻', hp: 800, atk: 50, range: 40, speed: 0.8 }, 'volcano_golem': { name: '火山魔像', icon: '🌋', hp: 15000, atk: 200, range: 100, speed: 0.5, splashRange: 80 }, 'alien_doge': { name: '外星狗狗', icon: '👽', hp: 100, atk: 15, range: 35, speed: 3, dodgeChance: 0.3 }, 'cyborg_snake': { name: '機械蛇蛇', icon: '🦾', hp: 500, atk: 40, range: 250, speed: 0.7 }, 'dark_lord': { name: '暗黑帝王', icon: '😈', hp: 25000, atk: 300, range: 120, speed: 0.4, waveAttack: { chance: 0.5, distance: 200 } }, 'ghost': { name: '幽靈', icon: '👻', hp: 150, atk: 25, range: 120, speed: 2.2, dodgeChance: 0.5 },'stone_golem': { name: '石頭人', icon: '🧱', hp: 2000, atk: 80, range: 50, speed: 0.4 },'abyss_lord': { name: '深淵領主', icon: '🐙', hp: 80000, atk: 500, range: 150, speed: 0.3, splashRange: 100 } };
    const TREASURES = { 'grass_amulet': { name: '草原護符', icon: '🍀', desc: '戰鬥開始時，金錢上限 +500。', effect: { type: 'moneyMax', value: 500 } }, 'cave_crystal': { name: '洞窟水晶', icon: '💎', desc: '金錢生產速度提升 10%。', effect: { type: 'moneyRate', value: 1.1 } }, 'forest_idol': { name: '森林神像', icon: '🗿', desc: '所有貓咪的 HP 提升 10%。', effect: { type: 'unitHp', value: 1.1 } }, 'plateau_relic': { name: '高原遺物', icon: '📜', desc: '所有貓咪的攻擊力提升 10%。', effect: { type: 'unitAtk', value: 1.1 } }, 'volcano_heart': { name: '火山之心', icon: '❤️‍🔥', desc: '貓咪砲充能時間減少 15%。', effect: { type: 'cannonCharge', value: 0.85 } }, 'cosmic_map': { name: '宇宙地圖', icon: '🗺️', desc: '我方基地 HP 增加 20%。', effect: { type: 'baseHp', value: 1.2 } }, 'steel_blueprint': { name: '鋼鐵藍圖', icon: '🔩', desc: '貓咪砲傷害提升 25%。', effect: { type: 'cannonDamage', value: 1.25 } }, 'dark_crown': { name: '暗黑王冠', icon: '👑', desc: 'XP 獲得量永久提升 20%。', effect: { type: 'xpGain', value: 1.2 } },'abyss_tentacle': { name: '深淵觸手', icon: '🦑', desc: '所有貓咪的出擊成本降低 5%。', effect: { type: 'costReduction', value: 0.95 } }, 'celestial_shield': { name: '蒼天之盾', icon: '🌌', desc: '我方基地受到的傷害減少 10%。', effect: { type: 'baseDamageReduction', value: 0.9 } }, 'crystal_of_speed': { name: '疾風水晶', icon: '🌪️', desc: '所有貓咪的移動速度提升 10%。', effect: { type: 'unitSpeed', value: 1.1 } }, 'orb_of_power': { name: '力量寶珠', icon: '🔮', desc: '貓咪砲的擊退效果提升 20%。', effect: { type: 'cannonKnockback', value: 1.2 } } };
    const STAGE_CONFIG = {
        1: { name: "新手草原", background: 'bg-grassland', enemyBaseHp: 2000, reward: { food: 50, xp: 100 }, enemies: [{ type: 'doge', time: 3 }, { type: 'doge', time: 8 }], treasureDrop: { id: 'grass_amulet', chance: 0.3 } },
        2: { name: "陰森洞窟", background: 'bg-cave', enemyBaseHp: 4000, reward: { food: 80, xp: 250 }, enemies: [{ type: 'snake', time: 4 }, { type: 'bat', time: 7 }, { type: 'doge', time: 10 }], treasureDrop: { id: 'cave_crystal', chance: 0.25 } },
        3: { name: "巨熊森林", background: 'bg-forest', enemyBaseHp: 7000, reward: { food: 150, xp: 500 }, enemies: [{ type: 'bear', time: 10 }, { type: 'doge', time: 12 }], treasureDrop: { id: 'forest_idol', chance: 0.2 }, stoneDrop: { chance: 0.1, amount: 1 } },
        4: { name: "霜凍高原", background: 'bg-plateau', enemyBaseHp: 9000, reward: { food: 200, xp: 700 }, enemies: [{ type: 'snake', time: 3 }, { type: 'bear', time: 20 }], treasureDrop: { id: 'plateau_relic', chance: 0.2 }, stoneDrop: { chance: 0.1, amount: 1 } },
        5: { name: "煉獄火山", background: 'bg-volcano', enemyBaseHp: 12000, reward: { food: 500, xp: 1500 }, enemies: [{ type: 'bear', time: 5 }, { type: 'volcano_golem', time: 30 }], treasureDrop: { id: 'volcano_heart', chance: 0.15 }, stoneDrop: { chance: 0.2, amount: 2 } },
        6: { name: "宇宙公路", background: 'bg-cosmic', enemyBaseHp: 15000, reward: { food: 300, xp: 1200 }, enemies: [{ type: 'alien_doge', time: 3 }, { type: 'alien_doge', time: 5 }, { type: 'ghost', time: 8 }, { type: 'bat', time: 15 }], treasureDrop: { id: 'cosmic_map', chance: 0.15 }, stoneDrop: { chance: 0.2, amount: 2 } },
        7: { name: "鋼鐵要塞", background: 'bg-fortress', enemyBaseHp: 20000, reward: { food: 400, xp: 2000 }, enemies: [{ type: 'cyborg_snake', time: 5 }, { type: 'stone_golem', time: 10 }, { type: 'cyborg_snake', time: 20 }], treasureDrop: { id: 'steel_blueprint', chance: 0.1 }, stoneDrop: { chance: 0.3, amount: 3 } },
        8: { name: "暗黑王座", background: 'bg-dark', enemyBaseHp: 50000, reward: { food: 1000, xp: 5000 }, enemies: [{ type: 'bear', time: 5 }, { type: 'bear', time: 10 }, { type: 'dark_lord', time: 30 }], treasureDrop: { id: 'dark_crown', chance: 0.1 }, stoneDrop: { chance: 0.5, amount: 5 } },
        9: { name: "深淵裂縫", background: 'bg-dark', enemyBaseHp: 120000, reward: { food: 2000, xp: 10000 }, enemies: [{ type: 'ghost', time: 3 }, { type: 'stone_golem', time: 10 }, { type: 'cyborg_snake', time: 20 }, { type: 'abyss_lord', time: 45 }], treasureDrop: { id: 'abyss_tentacle', chance: 0.1 }, stoneDrop: { chance: 1, amount: 10 } },
        10: { name: "魔王親衛隊", background: 'bg-dark', enemyBaseHp: 180000, reward: { food: 3000, xp: 15000 }, enemies: [{ type: 'ghost', time: 5 }, { type: 'ghost', time: 8 }, { type: 'dark_lord', time: 25 }, { type: 'dark_lord', time: 50 }], treasureDrop: { id: 'celestial_shield', chance: 0.1 }, stoneDrop: { chance: 1, amount: 15 } },
        11: { name: "異次元裂縫", background: 'bg-cosmic', enemyBaseHp: 250000, reward: { food: 4000, xp: 22000 }, enemies: [{ type: 'alien_doge', time: 2 }, { type: 'alien_doge', time: 4 }, { type: 'alien_doge', time: 6 }, { type: 'cyborg_snake', time: 15 }, { type: 'abyss_lord', time: 60 }], treasureDrop: { id: 'crystal_of_speed', chance: 0.1 }, stoneDrop: { chance: 1, amount: 20 } },
        12: { name: "終焉之刻", background: 'bg-volcano', enemyBaseHp: 400000, reward: { food: 8000, xp: 50000 }, enemies: [{ type: 'volcano_golem', time: 10 }, { type: 'dark_lord', time: 40 }, { type: 'abyss_lord', time: 80 }], treasureDrop: { id: 'orb_of_power', chance: 0.1 }, stoneDrop: { chance: 1, amount: 50 } }
    };
    const SPECIAL_STAGE_CONFIG = {
        'endless_1': {
            name: "無盡迴廊",
            background: 'bg-dark',
            rewardPerSecond: { xp: 1, food: 0.1 }, // 每秒的獎勵
            initialEnemies: ['doge', 'snake'], // 開場會出現的敵人種類
            // 難度擴展設定
            scalingTiers: [
                { time: 60000,  newEnemies: ['bat'], spawnInterval: 8000 }, // 1分鐘後, 加入蝙蝠, 縮短出兵間隔
                { time: 120000, newEnemies: ['bear'], spawnInterval: 7000, statMultiplier: 1.1 }, // 2分鐘後, 加入熊, 敵人屬性提升10%
                { time: 240000, newEnemies: ['ghost', 'alien_doge'], spawnInterval: 6000, statMultiplier: 1.25 }, // 4分鐘後
                { time: 480000, newEnemies: ['cyborg_snake', 'stone_golem'], spawnInterval: 5000, statMultiplier: 1.5 } // 8分鐘後
            ],
            boss: {
                interval: 180000, // 每 3 分鐘 (180000 ms)
                pool: ['volcano_golem', 'dark_lord', 'abyss_lord'], // BOSS 池
                statMultiplierIncrement: 0.5 // 每次出現時，BOSS的額外屬性倍率增量
            }
        }
    };
    const LIMITED_POOL_ROTATIONS = [ { name: "超古代勇者", icon: "🗿", desc: "傳說中的古代英雄們集結！", rateUp: ['cat_samurai', 'cat_king'], style: "background: linear-gradient(145deg, #c31432, #240b36);" }, { name: "鋼鐵軍團", icon: "⚙️", desc: "用未來科技粉碎敵人！", rateUp: ['cat_mecha', 'cat_gunslinger'], style: "background: linear-gradient(145deg, #757f9a, #d7dde8);" }, { name: "時空旅人", icon: "🌌", desc: "掌握時間與空間的神秘力量！", rateUp: ['cat_timelord', 'cat_magic'], style: "background: linear-gradient(145deg, #1e3c72, #2a5298);" }, { name: "聖光與女武神", icon: "✨", desc: "神聖的力量將淨化一切！", rateUp: ['cat_valkyrie', 'cat_healer'], style: "background: linear-gradient(145deg, #f7ff00, #db36a4);" }, { name: "淘金熱潮", icon: "💰", desc: "致富的機會來了！", rateUp: ['cat_miner', 'cat_axe'], style: "background: linear-gradient(145deg, #f1c40f, #f39c12);" }, { name: "天體奇觀", icon: "🔭", desc: "來自宇宙深處的未知力量！", rateUp: ['cat_cosmic_dragon', 'cat_bard'], style: "background: linear-gradient(145deg, #4b6cb7, #182848);" }, { name: "暗影奇襲", icon: "🌙", desc: "悄無聲息，一擊斃命！", rateUp: ['cat_assassin', 'cat_ninja'], style: "background: linear-gradient(145deg, #2c3e50, #4c5b6a);" }, { name: "神聖制裁", icon: "⚖️", desc: "以聖光之名，制裁邪惡！", rateUp: ['cat_paladin', 'cat_healer'], style: "background: linear-gradient(145deg, #e9e4f0, #d3cce3);" }, { name: "末日兵器", icon: "💥", desc: "絕對的破壞力，將一切化為灰燼。", rateUp: ['cat_demolitionist', 'cat_mecha'], style: "background: linear-gradient(145deg, #cb2d3e, #ef473a);" }, { name: "天神下凡", icon: "👑", desc: "傳說中的神祇降臨戰場！", rateUp: ['cat_sun_god', 'cat_timelord'], style: "background: linear-gradient(145deg, #ffdde1, #ee9ca7);" }, { name: "不死傳說", icon: "👻", desc: "來自深淵的黑暗力量，支配生死！", rateUp: ['cat_alchemist', 'cat_necromancer'], style: "background: linear-gradient(145deg, #434343, #000000);" }, { name: "傳說再臨", icon: "✨", desc: "神秘的新力量覺醒！", rateUp: ['cat_shaman', 'cat_behemoth'], style: "background: linear-gradient(145deg, #833ab4, #fd1d1d, #fcb045);" } ];
    const RARITY_CONFIG = { 'N': { prob: 0.55 }, 'R': { prob: 0.35 }, 'SSR': { prob: 0.08 }, 'UR': { prob: 0.02 }, };
    const POOL_CONFIG = { normal: { costSingle: 30, costTen: 270, units: Object.keys(ALL_UNITS).filter(id => !ALL_UNITS[id].isMinion && (['N', 'R'].includes(ALL_UNITS[id].rarity) || id === 'cat_king')) }, limited: { costSingle: 60, costTen: 540, units: Object.keys(ALL_UNITS).filter(id => !ALL_UNITS[id].isMinion) } };
    const MONEY_LEVEL_CONFIG = [{ cost: 100, max: 1000, rate: 20 }, { cost: 150, max: 1200, rate: 25 }, { cost: 200, max: 1500, rate: 30 }, { cost: 300, max: 1800, rate: 40 }, { cost: 500, max: 2500, rate: 50 }, { cost: Infinity, max: 2500, rate: 50 }];
    const DUPLICATE_CONVERSION = { 'N': { xp: 10, food: 2 }, 'R': { xp: 50, food: 5 }, 'SSR': { xp: 200, food: 20 }, 'UR': { xp: 1000, food: 100 } };
    const DECK_SIZE_LIMIT = 8;
    const CANNON_CONFIG = [ { level: 1, damage: 100, knockback: 50, chargeTimeSec: 60, upgradeCost: 1000 }, { level: 2, damage: 150, knockback: 60, chargeTimeSec: 58, upgradeCost: 2500 }, { level: 3, damage: 200, knockback: 70, chargeTimeSec: 55, upgradeCost: 5000 }, { level: 4, damage: 300, knockback: 80, chargeTimeSec: 50, upgradeCost: 10000 }, { level: 5, damage: 500, knockback: 100, chargeTimeSec: 45, upgradeCost: Infinity }, ];
    const LOGIN_REWARDS = [ { type: 'xp', value: 500, icon: '🌟' }, { type: 'food', value: 50, icon: '🥫' }, { type: 'xp', value: 1000, icon: '🌟' }, { type: 'food', value: 100, icon: '🥫' }, { type: 'xp', value: 2000, icon: '🌟' }, { type: 'food', value: 150, icon: '🥫' }, { type: 'food', value: 300, icon: '🎁' } ];
    const MISSION_POOL = [ { id: 'win_stages', text: (n) => `通關 ${n} 次任意關卡`, target: 3, reward: { type: 'xp', value: 500 } }, { id: 'kill_enemies', text: (n) => `擊敗 ${n} 隻敵人`, target: 50, reward: { type: 'xp', value: 800 } }, { id: 'pull_gacha', text: (n) => `進行 ${n} 次轉蛋`, target: 5, reward: { type: 'food', value: 30 } }, { id: 'upgrade_unit', text: (n) => `升級貓咪 ${n} 次`, target: 1, reward: { type: 'xp', value: 300 } }, { id: 'spend_money', text: (n) => `在戰鬥中花費 $${n}`, target: 2000, reward: { type: 'food', value: 20 } }, ];
    const ENCHANTMENT_CONFIG = { maxLevel: 10, hpPerLevel: 0.02, atkPerLevel: 0.02, cost: { 'N': 1, 'R': 2, 'SSR': 5, 'UR': 10 } };
    const QUALITY_CONFIG = {
        tiers: [
            { name: '普通', bonus: 1.0,  prob: 0.50, color: '#a0a0a0' },
            { name: '優良', bonus: 1.02, prob: 0.30, color: '#2ecc71' },
            { name: '稀有', bonus: 1.05, prob: 0.15, color: '#3498db' },
            { name: '史詩', bonus: 1.10, prob: 0.04, color: '#9b59b6' },
            { name: '傳說', bonus: 1.18, prob: 0.01, color: '#e67e22' }
        ],
        cost: { 'N': 10, 'R': 20, 'SSR': 50, 'UR': 100 }
    };
    const COLLECTION_REWARD_AMOUNT = 5; 
    const SHOP_ITEMS = { 'xp_small': { name: 'XP包 (小)', icon: '🌟', desc: '一點點經驗值，用於應急。', cost: 100, reward: { type: 'xp', value: 1000 } }, 'xp_medium': { name: 'XP包 (中)', icon: '🌟', desc: '可觀的經驗值，加速強化。', cost: 450, reward: { type: 'xp', value: 5000 } }, 'xp_large': { name: 'XP包 (大)', icon: '🌟', desc: '大量的經驗值，讓你的隊伍突飛猛進！', cost: 800, reward: { type: 'xp', value: 10000 } }, 'stone_small': { name: '魔法石 (小)', icon: '💎', desc: '用於附魔的魔法石。', cost: 200, reward: { type: 'magicStones', value: 10 } }, 'stone_large': { name: '魔法石 (大)', icon: '💎', desc: '大量的魔法石，打造究極貓咪！', cost: 1000, reward: { type: 'magicStones', value: 60 } }, };
    
    // --- 遊戲狀態變數 ---
    let playerState = { catFood: 1000, xp: 500, magicStones: 0, unitLevels: {}, deck: [], settings: { volume: 0.3 }, catCannon: { level: 1 }, treasures: {}, lastLoginDate: null, loginStreak: 0, lastClaimedStreak: 0, dailyMissions: [], unlockedUnits: new Set(), seenEnemies: new Set(), collectionRewards: { units: new Set(), enemies: new Set() }, specialStageRecords: {} };
    let battleState = {};
    let gameLoopId = null, gachaTimerIntervalId = null;
    let hasShownLoginReward = false;
    let isUpgradeMode = false;

    // --- 常數與工具函式 ---
    const GAME_VERSION = '11.2';
    const SAVE_KEY = `catBrawlSaveData_v${GAME_VERSION}`;
    const PREVIOUS_SAVE_KEYS = ['catBrawlSaveData_v11.1', 'catBrawlSaveData_v11.0', 'catBrawlSaveData_v10.6', 'catBrawlSaveData_v10.5', 'catBrawlSaveData_v10.4', 'catBrawlSaveData_v10.3', 'catBrawlSaveData_v10.2', 'catBrawlSaveData_v10.1', 'catBrawlSaveData_v10.0'];
    const sleep = ms => new Promise(res => setTimeout(res, ms));

    function compareVersions(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        const len = Math.max(parts1.length, parts2.length);
        for (let i = 0; i < len; i++) {
            const p1 = parts1[i] || 0;
            const p2 = parts2[i] || 0;
            if (p1 > p2) return 1;
            if (p1 < p2) return -1;
        }
        return 0;
    }

    function uint8ArrayToBase64(bytes) { let binary = ''; const len = bytes.byteLength; for (let i = 0; i < len; i++) { binary += String.fromCharCode(bytes[i]); } return window.btoa(binary); }
    function base64ToUint8Array(base64) { const binary_string = window.atob(base64); const len = binary_string.length; const bytes = new Uint8Array(len); for (let i = 0; i < len; i++) { bytes[i] = binary_string.charCodeAt(i); } return bytes; }
    function showToast(message) { const container = document.getElementById('toast-container'); const toast = document.createElement('div'); toast.className = 'toast-message'; toast.textContent = message; container.appendChild(toast); setTimeout(() => toast.remove(), 3000); }
    
    // --- 遊戲核心函式 ---

    function saveGame() {
        const stateToSave = {
            ...playerState,
            version: GAME_VERSION,
            unlockedUnits: [...playerState.unlockedUnits],
            seenEnemies: [...playerState.seenEnemies],
            collectionRewards: {
                units: [...playerState.collectionRewards.units],
                enemies: [...playerState.collectionRewards.enemies],
            }
        };
        try {
            localStorage.setItem(SAVE_KEY, JSON.stringify(stateToSave));
        } catch (e) {
            console.error('儲存失敗:', e);
        }
    }
    
    function migrateSaveData(loadedState) {
        const fromVersion = loadedState.version || '9.9'; 
        if (compareVersions(fromVersion, GAME_VERSION) >= 0) {
            return loadedState;
        }
        console.log(`正在從版本 ${fromVersion} 遷移存檔到 ${GAME_VERSION}...`);
        loadedState.version = GAME_VERSION;
        console.log("存檔遷移完成！");
        return loadedState;
    }
    
    function loadGame() {
        const allKeys = [SAVE_KEY, ...PREVIOUS_SAVE_KEYS];
        let foundSaveData = null;
        let foundKey = null;

        for (const key of allKeys) {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    JSON.parse(data); 
                    foundSaveData = data;
                    foundKey = key;
                    console.log(`找到最新的有效存檔: ${key}`);
                    break;
                } catch(e) {
                    console.warn(`發現損毀的存檔: ${key}，將其忽略並刪除。`);
                    localStorage.removeItem(key);
                }
            }
        }

        if (foundSaveData) {
            try {
                let loadedState = JSON.parse(foundSaveData);
                loadedState = migrateSaveData(loadedState);

                let freshState = { catFood: 1000, xp: 500, magicStones: 0, unitLevels: {}, deck: [], settings: { volume: 0.3 }, catCannon: { level: 1 }, treasures: {}, lastLoginDate: null, loginStreak: 0, lastClaimedStreak: 0, dailyMissions: [], unlockedUnits: new Set(), seenEnemies: new Set(), collectionRewards: { units: new Set(), enemies: new Set() }, specialStageRecords: {} };
                playerState = { ...freshState, ...loadedState };
                playerState.unlockedUnits = new Set(loadedState.unlockedUnits || []);
                playerState.seenEnemies = new Set(loadedState.seenEnemies || []);
                playerState.collectionRewards = {
                    units: new Set(loadedState.collectionRewards?.units || []),
                    enemies: new Set(loadedState.collectionRewards?.enemies || []),
                };
                playerState.settings = { ...freshState.settings, ...loadedState.settings };
                playerState.catCannon = { ...freshState.catCannon, ...loadedState.catCannon };
                playerState.treasures = { ...loadedState.treasures };
                playerState.dailyMissions = loadedState.dailyMissions || [];
                playerState.specialStageRecords = loadedState.specialStageRecords || {};
                
                for (const unitId in playerState.unitLevels) {
                    if (typeof playerState.unitLevels[unitId] === 'number') {
                        playerState.unitLevels[unitId] = {
                            level: playerState.unitLevels[unitId],
                            enchantments: { hp: 0, atk: 0 },
                            quality: 0
                        };
                    }
                    if (playerState.unitLevels[unitId].quality === undefined) {
                        playerState.unitLevels[unitId].quality = 0;
                    }
                }
                if (!playerState.deck || playerState.deck.length === 0) {
                    playerState.deck = Object.keys(playerState.unitLevels).slice(0, DECK_SIZE_LIMIT);
                }

                if (foundKey !== SAVE_KEY) {
                    console.log('正在將舊存檔以新金鑰儲存...');
                    saveGame(); 
                    PREVIOUS_SAVE_KEYS.forEach(oldKey => {
                       if (oldKey !== SAVE_KEY) localStorage.removeItem(oldKey);
                    });
                    if (foundKey) localStorage.removeItem(foundKey);
                    console.log('舊存檔清理完畢。');
                }
            } catch(e) {
                console.error("讀取存檔失敗，將重置進度。", e);
                localStorage.removeItem(foundKey); 
                initializeNewGame();
            }
        } else {
            initializeNewGame();
        }
        handleDailyReset();
    }
    
    function initializeNewGame() {
        console.log("未找到任何存檔，初始化新遊戲。");
        initializeUnit('cat_basic');
        playerState.deck = Object.keys(playerState.unitLevels);
        saveGame();
    }
    
    function exportSave() {
        const stateString = localStorage.getItem(SAVE_KEY);
        if (!stateString) { alert('找不到存檔！'); return; }
        try {
            const textBuffer = new TextEncoder().encode(stateString);
            const compressed = pako.deflate(textBuffer);
            const encodedSave = uint8ArrayToBase64(compressed);
            prompt('請手動長按、全選並複製以下存檔碼：', encodedSave);
        } catch (e) {
            alert('產生存檔碼時發生錯誤！');
            console.error("匯出失敗:", e);
        }
    }

    function importSave() {
        const encodedString = prompt('請貼上您的存檔碼：');
        if (encodedString && encodedString.trim() !== '') {
            try {
                const compressed = base64ToUint8Array(encodedString);
                const restoredBuffer = pako.inflate(compressed);
                const decodedString = new TextDecoder().decode(restoredBuffer);
                const tempState = JSON.parse(decodedString);
                if (tempState && tempState.catFood !== undefined && tempState.version) {
                    if (confirm('偵測到有效的存檔。匯入將會覆蓋目前的遊戲進度，確定要繼續嗎？')) {
                        PREVIOUS_SAVE_KEYS.forEach(key => localStorage.removeItem(key));
                        localStorage.setItem(SAVE_KEY, decodedString);
                        alert('匯入成功！遊戲將會重新載入。');
                        location.reload();
                    }
                } else { alert('存檔碼格式錯誤！'); }
            } catch (err) {
                alert('匯入失敗！存檔碼無效或已損毀。');
                console.error('匯入錯誤:', err);
            }
        }
    }
    
    function makeScrollable(container) {
        if (!container) return;
        container.classList.add('draggable-scroll');
    
        container.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                return;
            }
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        });
    
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;
        let lastDragTime = 0;
    
        const start = (e) => {
            isDown = true;
            isDragging = false;
            container.classList.add('active-drag');
            startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            lastDragTime = Date.now();
        };
    
        const move = (e) => {
            if (!isDown) return;
            
            const x = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
            const walk = x - startX;
            
            if (Math.abs(walk) > 5) {
                if (!isDragging) {
                    isDragging = true;
                }
            }
    
            if (isDragging) {
                e.preventDefault();
                container.scrollLeft = scrollLeft - walk;
            }
        };
    
        const end = (e) => {
            if (!isDown) return;
            isDown = false;
            container.classList.remove('active-drag');
            if (isDragging && (Date.now() - lastDragTime) < 150) {
               isDragging = false;
            }
        };
    
        container.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            start(e);
        });
        container.addEventListener('mousemove', move);
        container.addEventListener('mouseup', end);
        container.addEventListener('mouseleave', end);
    
        container.addEventListener('touchstart', start, { passive: false });
        container.addEventListener('touchmove', move);
        container.addEventListener('touchend', end);
        container.addEventListener('touchcancel', end);
    
        container.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    async function handleGachaPull(count, poolType, poolIndex = -1) { let config, rateUpUnits = []; if (poolType === 'normal') { config = POOL_CONFIG.normal; } else { const currentPool = LIMITED_POOL_ROTATIONS[poolIndex]; config = { ...POOL_CONFIG.limited, ...currentPool }; rateUpUnits = currentPool.rateUp; } const cost = count === 1 ? config.costSingle : config.costTen; if (playerState.catFood < cost) { showToast('貓罐頭不足！'); return; } document.getElementById('gacha-pull-1').disabled = true; document.getElementById('gacha-pull-10').disabled = true; updateMissionProgress('pull_gacha', count); playerState.catFood -= cost; const results = []; let highestRarity = 'N'; const rarityOrder = { N: 0, R: 1, SSR: 2, UR: 3 }; for (let i = 0; i < count; i++) { let rand = Math.random(), chosenRarity, cumulativeProb = 0; for (const rarity in RARITY_CONFIG) { cumulativeProb += RARITY_CONFIG[rarity].prob; if (rand < cumulativeProb) { chosenRarity = rarity; break; } } if (poolType === 'normal' && chosenRarity === 'UR') chosenRarity = 'SSR'; let unitId; const potentialRateUp = rateUpUnits.filter(id => ALL_UNITS[id] && ALL_UNITS[id].rarity === chosenRarity); if (potentialRateUp.length > 0 && Math.random() < 0.5) { unitId = potentialRateUp[Math.floor(Math.random() * potentialRateUp.length)]; } else { const availableUnits = config.units.filter(id => ALL_UNITS[id] && ALL_UNITS[id].rarity === chosenRarity); unitId = availableUnits.length > 0 ? availableUnits[Math.floor(Math.random() * availableUnits.length)] : 'cat_basic'; } const isNew = initializeUnit(unitId); if (!isNew) { const conversion = DUPLICATE_CONVERSION[ALL_UNITS[unitId].rarity]; playerState.xp += conversion.xp; playerState.catFood += conversion.food; } results.push({ id: unitId, isNew: isNew }); if (rarityOrder[chosenRarity] > rarityOrder[highestRarity]) { highestRarity = chosenRarity; } } updateTopBar(); document.querySelector('#gacha-current-food span').textContent = playerState.catFood; const gachaGate = document.getElementById('gacha-gate'); gachaGate.className = 'gacha-gate'; let waitTime = 1500; if (highestRarity === 'UR') { gachaGate.classList.add('ur-mode'); waitTime = 3000; } else if (highestRarity === 'SSR') { gachaGate.classList.add('ssr-mode'); waitTime = 2000; } document.getElementById('gacha-animation-overlay').style.display = 'flex'; await sleep(waitTime); document.getElementById('gacha-animation-overlay').style.display = 'none'; const container = document.getElementById('gacha-results'); container.innerHTML = ''; for (const result of results) { const resultContainer = document.createElement('div'); resultContainer.className = 'gacha-card-container'; const card = createUnitCard(result.id); const feedback = document.createElement('div'); feedback.className = 'gacha-card-feedback'; if (result.isNew) { feedback.classList.add('feedback-new'); feedback.textContent = 'NEW!'; } else { const conv = DUPLICATE_CONVERSION[ALL_UNITS[result.id].rarity]; feedback.classList.add('feedback-dupe'); feedback.textContent = `+${conv.xp} XP, +${conv.food}🥫`; } resultContainer.appendChild(card); resultContainer.appendChild(feedback); container.appendChild(resultContainer); const rarity = ALL_UNITS[result.id].rarity; if (rarity === 'SSR' || rarity === 'UR') { resultContainer.classList.add('rare-reveal-animation'); await sleep(800); } else { resultContainer.classList.add('reveal-animation'); await sleep(200); } } document.getElementById('gacha-pull-1').disabled = false; document.getElementById('gacha-pull-10').disabled = false; saveGame(); }
    
    function setupEventListeners() {
        document.getElementById('start-screen').addEventListener('click', () => { initBgm(); switchScreen('hub-screen'); }, { once: true });
        document.getElementById('go-to-stages-button').addEventListener('click', () => { renderStageSelect(); switchScreen('stage-select-screen'); });
        document.getElementById('go-to-gacha-button').addEventListener('click', () => { showPoolSelection(); switchScreen('gacha-screen'); });
        document.getElementById('go-to-collection-button').addEventListener('click', () => { showMenuModal(false); renderDeckEditor(); switchScreen('collection-screen'); });
        document.getElementById('go-to-base-upgrades-button').addEventListener('click', () => { showMenuModal(false); renderBaseUpgradeScreen(); switchScreen('base-upgrade-screen'); });
        document.getElementById('go-to-treasures-button').addEventListener('click', () => { showMenuModal(false); renderTreasureScreen(); switchScreen('treasure-screen'); });
        document.getElementById('go-to-daily-button').addEventListener('click', () => { showMenuModal(false); showDailyModal(true); });
        document.getElementById('go-to-collection-book-button').addEventListener('click', () => { showMenuModal(false); const collectionBookScreen = document.getElementById('collection-book-screen'); collectionBookScreen.querySelector('.tab-button[data-tab="player-units"]').classList.add('active'); collectionBookScreen.querySelector('.tab-button[data-tab="enemy-units"]').classList.remove('active'); document.getElementById('player-units-tab').classList.add('active'); document.getElementById('enemy-units-tab').classList.remove('active'); renderCollectionBook(); switchScreen('collection-book-screen'); });
        document.getElementById('go-to-shop-button').addEventListener('click', () => { showMenuModal(false); renderShopScreen(); switchScreen('shop-screen'); });
        document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);
        document.getElementById('go-to-menu-button').addEventListener('click', () => showMenuModal(true));
        const menuModalOverlay = document.getElementById('menu-modal-overlay');
        menuModalOverlay.querySelector('.menu-modal-close').addEventListener('click', () => showMenuModal(false));
        menuModalOverlay.addEventListener('click', (e) => { if (e.target.id === 'menu-modal-overlay') showMenuModal(false); });
        document.getElementById('back-to-hub-button').addEventListener('click', () => { if (gachaTimerIntervalId) clearInterval(gachaTimerIntervalId); switchScreen('hub-screen'); });
        document.getElementById('back-to-stages-button').addEventListener('click', () => { renderStageSelect(); switchScreen('stage-select-screen'); });
        document.getElementById('stage-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('gacha-main-back-button').addEventListener('click', () => { if (gachaTimerIntervalId) clearInterval(gachaTimerIntervalId); switchScreen('hub-screen'); });
        document.getElementById('gacha-pool-back-button').addEventListener('click', showPoolSelection);
        document.getElementById('collection-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('base-upgrade-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('treasure-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('collection-book-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('shop-back-button').addEventListener('click', () => switchScreen('hub-screen'));
        document.getElementById('upgrade-money-btn').addEventListener('click', handleUpgradeMoney);
        document.getElementById('speed-toggle-btn').addEventListener('click', toggleBattleSpeed);
        document.getElementById('pause-btn').addEventListener('click', () => togglePause(true));
        document.getElementById('resume-btn').addEventListener('click', () => togglePause(false));
        document.getElementById('quit-battle-btn').addEventListener('click', quitBattle);
        document.getElementById('fire-cannon-btn').addEventListener('click', fireCatCannon);
        document.getElementById('settings-button').addEventListener('click', () => showSettings(true));
        document.getElementById('settings-overlay').addEventListener('click', (e) => { if (e.target.id === 'settings-overlay') showSettings(false); });
        document.getElementById('volume-slider').addEventListener('input', (e) => setVolume(e.target.value));
        document.getElementById('reset-game-button').addEventListener('click', resetGame);
        document.getElementById('export-save-button').addEventListener('click', exportSave);
        document.getElementById('import-save-button').addEventListener('click', importSave);
        const upgradeModalOverlay = document.getElementById('upgrade-modal-overlay');
        upgradeModalOverlay.querySelector('.upgrade-modal-close').addEventListener('click', closeUpgradeModal);
        upgradeModalOverlay.addEventListener('click', (e) => { if (e.target.id === 'upgrade-modal-overlay') closeUpgradeModal(); });
        const dailyModalOverlay = document.getElementById('daily-modal-overlay');
        dailyModalOverlay.querySelector('.daily-modal-close').addEventListener('click', () => showDailyModal(false));
        dailyModalOverlay.addEventListener('click', (e) => { if (e.target.id === 'daily-modal-overlay') showDailyModal(false); });
        dailyModalOverlay.querySelectorAll('.tab-button').forEach(btn => { btn.addEventListener('click', () => switchTab(btn.dataset.tab)); });
        dailyModalOverlay.querySelector('#mission-list').addEventListener('click', (e) => { const target = e.target.closest('.mission-claim-btn'); if (target) { claimMission(parseInt(target.dataset.index)); } });
        const collectionBookScreen = document.getElementById('collection-book-screen');
        collectionBookScreen.querySelectorAll('.tab-button').forEach(btn => { btn.addEventListener('click', () => { collectionBookScreen.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active')); btn.classList.add('active'); collectionBookScreen.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active'); }); });
        document.getElementById('claim-all-rewards-btn').addEventListener('click', claimAllCollectionRewards);
        document.getElementById('player-units-tab').addEventListener('click', (e) => handleCollectionItemClick(e, 'player'));
        document.getElementById('enemy-units-tab').addEventListener('click', (e) => handleCollectionItemClick(e, 'enemy'));
        document.getElementById('toggle-upgrade-mode-btn').addEventListener('click', () => { isUpgradeMode = !isUpgradeMode; updateUpgradeModeUI(); renderDeckEditor(); });
        document.getElementById('normal-pool-details-btn').addEventListener('click', (e) => { e.stopPropagation(); showGachaRatesModal('normal'); });
        document.getElementById('limited-pool-details-btn').addEventListener('click', (e) => { e.stopPropagation(); showGachaRatesModal('limited'); });
        const gachaRatesModal = document.getElementById('gacha-rates-modal-overlay');
        gachaRatesModal.querySelector('.gacha-rates-modal-close').addEventListener('click', hideGachaRatesModal);
        gachaRatesModal.addEventListener('click', (e) => { if (e.target.id === 'gacha-rates-modal-overlay') { hideGachaRatesModal(); } });
        const collectionDetailModal = document.getElementById('collection-detail-modal-overlay');
        collectionDetailModal.querySelector('.collection-detail-modal-close').addEventListener('click', hideCollectionDetailModal);
        collectionDetailModal.addEventListener('click', (e) => { if (e.target.id === 'collection-detail-modal-overlay') { hideCollectionDetailModal(); } });
        const iosGuideOverlay = document.getElementById('ios-guide-overlay');
        if (iosGuideOverlay) {
            iosGuideOverlay.querySelector('.close-guide-btn').addEventListener('click', () => {
                iosGuideOverlay.style.display = 'none';
                localStorage.setItem('hasSeenIosGuide', 'true');
            });
        }
        makeScrollable(document.getElementById('current-deck-display'));
        makeScrollable(document.getElementById('owned-units-grid'));
        makeScrollable(document.getElementById('deployment-bar'));

        document.getElementById('go-to-enchant-button').addEventListener('click', () => {
            renderEnchantScreen();
            switchScreen('enchant-screen');
        });
        document.getElementById('enchant-back-button').addEventListener('click', () => switchScreen('hub-screen'));
    }
    
    function renderDeckEditor() {
        updateUpgradeModeUI();
        document.getElementById('deck-count').textContent = playerState.deck.length;
        document.getElementById('deck-limit').textContent = DECK_SIZE_LIMIT;
        const deckDisplay = document.getElementById('current-deck-display');
        const ownedGrid = document.getElementById('owned-units-grid');
        deckDisplay.innerHTML = '';
        ownedGrid.innerHTML = '';
        playerState.deck.forEach(unitId => {
            const card = createUnitCard(unitId);
            card.addEventListener('click', () => {
                handleDeckChange(unitId, 'remove');
            });
            card.addEventListener('dblclick', (e) => {
                e.stopPropagation();
                showUpgradeModal(unitId);
            });
            deckDisplay.appendChild(card);
        });
        for (let i = playerState.deck.length; i < DECK_SIZE_LIMIT; i++) {
            const slot = document.createElement('div');
            slot.className = 'deck-slot';
            deckDisplay.appendChild(slot);
        }
        Object.keys(playerState.unitLevels).sort((a, b) => ALL_UNITS[b].rarity.localeCompare(ALL_UNITS[a].rarity) || getUnitDeployCost(a) - getUnitDeployCost(b)).forEach(unitId => {
            const card = createUnitCard(unitId);
            if (playerState.deck.includes(unitId)) {
                card.classList.add('in-deck');
            }
            card.addEventListener('click', () => {
                if (isUpgradeMode) {
                    showUpgradeModal(unitId);
                } else {
                    handleDeckChange(unitId, 'toggle');
                }
            });
            ownedGrid.appendChild(card);
        });
    }

    function showGachaRatesModal(poolType) { let poolConfig, poolUnits, poolName, rateUpUnits = []; const ratesSummary = document.getElementById('gacha-rates-summary'); const ratesDetails = document.getElementById('gacha-rates-details'); if (poolType === 'normal') { poolConfig = POOL_CONFIG.normal; poolName = '常駐池'; poolUnits = poolConfig.units; ratesSummary.innerHTML = `<span><strong>N:</strong> ${(RARITY_CONFIG.N.prob * 100).toFixed(1)}%</span> <span><strong>R:</strong> ${(RARITY_CONFIG.R.prob * 100).toFixed(1)}%</span> <span><strong>SSR:</strong> ${((RARITY_CONFIG.SSR.prob + RARITY_CONFIG.UR.prob) * 100).toFixed(1)}%</span>`; } else { const poolIndex = getCurrentLimitedPoolIndex(); poolConfig = LIMITED_POOL_ROTATIONS[poolIndex]; rateUpUnits = poolConfig.rateUp || []; poolName = poolConfig.name; poolUnits = POOL_CONFIG.limited.units; ratesSummary.innerHTML = `<span><strong>N:</strong> ${(RARITY_CONFIG.N.prob * 100).toFixed(1)}%</span> <span><strong>R:</strong> ${(RARITY_CONFIG.R.prob * 100).toFixed(1)}%</span> <span><strong>SSR:</strong> ${(RARITY_CONFIG.SSR.prob * 100).toFixed(1)}%</span> <span><strong>UR:</strong> ${(RARITY_CONFIG.UR.prob * 100).toFixed(1)}%</span>`; } document.getElementById('gacha-rates-title').textContent = `${poolName} - 機率詳情`; ratesDetails.innerHTML = ''; const unitsByRarity = { UR: [], SSR: [], R: [], N: [] }; poolUnits.forEach(unitId => { const unit = ALL_UNITS[unitId]; if (unit && unitsByRarity[unit.rarity]) { unitsByRarity[unit.rarity].push(unitId); } }); ['UR', 'SSR', 'R', 'N'].forEach(rarity => { if (unitsByRarity[rarity].length > 0) { let sectionHTML = `<h3>${rarity} 角色</h3><div class="rate-unit-grid">`; unitsByRarity[rarity].sort((aId, bId) => ALL_UNITS[aId].cost - ALL_UNITS[bId].cost).forEach(unitId => { const unit = ALL_UNITS[unitId]; const isRateUp = rateUpUnits.includes(unitId); sectionHTML += `<div class="rate-unit-item ${isRateUp ? 'rate-up' : ''}"><span class="icon">${unit.icon}</span><span class="name">${unit.name}</span></div>`; }); sectionHTML += `</div>`; ratesDetails.innerHTML += sectionHTML; } }); document.getElementById('gacha-rates-modal-overlay').style.display = 'flex'; }
    function hideGachaRatesModal() { document.getElementById('gacha-rates-modal-overlay').style.display = 'none'; }
    function initializeUnit(unitId) {
        if (!playerState.unitLevels[unitId]) {
            playerState.unitLevels[unitId] = { level: 1, enchantments: { hp: 0, atk: 0 }, quality: 0 };
            if (playerState.deck.length < DECK_SIZE_LIMIT) {
                playerState.deck.push(unitId);
            }
            playerState.unlockedUnits.add(unitId);
            updateCollectionBookBadge();
            return true;
        }
        return false;
    }
    function handleDailyReset() { const today = new Date().toISOString().split('T')[0]; const lastLogin = playerState.lastLoginDate; hasShownLoginReward = false; if (today !== lastLogin) { const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]; if (lastLogin === yesterday) { playerState.loginStreak++; } else { playerState.loginStreak = 1; playerState.lastClaimedStreak = 0; } playerState.lastLoginDate = today; playerState.dailyMissions = []; const shuffledMissions = [...MISSION_POOL].sort(() => 0.5 - Math.random()); for (let i = 0; i < 3; i++) { const missionTemplate = shuffledMissions[i]; playerState.dailyMissions.push({ id: missionTemplate.id, progress: 0, target: missionTemplate.target, claimed: false, }); } saveGame(); } updateNotificationBadge(); }
    function updateMissionProgress(missionId, value) { if (!playerState.dailyMissions) return; const mission = playerState.dailyMissions.find(m => m.id === missionId && !m.claimed); if (mission) { mission.progress = Math.min(mission.target, mission.progress + value); saveGame(); updateNotificationBadge(); } }
    function updateNotificationBadge() { const hasClaimableMissions = playerState.dailyMissions.some(m => m.progress >= m.target && !m.claimed); const dailyBadge = document.querySelector('#go-to-daily-button .notification-badge'); if (dailyBadge) { dailyBadge.style.display = hasClaimableMissions ? 'flex' : 'none'; } }
    function resetGame() { if (confirm('您確定要刪除所有遊戲進度並重新開始嗎？此操作無法復原！')) { localStorage.removeItem(SAVE_KEY); PREVIOUS_SAVE_KEYS.forEach(key => localStorage.removeItem(key)); location.reload(); } }
    
    function switchScreen(screenId) {
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const newScreen = document.getElementById(screenId);
        newScreen.classList.add('active');
        const hasBackButton = newScreen.querySelector('.back-button');
        const isStartScreen = screenId === 'start-screen';
        if (hasBackButton || isStartScreen || screenId === 'battle-screen') {
            fullscreenBtn.style.display = 'none';
        } else {
            fullscreenBtn.style.display = 'flex';
        }

        if (screenId === 'hub-screen') {
            updateTopBar();
            if (!hasShownLoginReward) {
                const today = new Date().toISOString().split('T')[0];
                if (playerState.lastLoginDate === today && playerState.loginStreak > (playerState.lastClaimedStreak || 0)) {
                    setTimeout(() => showDailyModal(true, 'login'), 500);
                }
                hasShownLoginReward = true;
            }
        }
    }

    function updateTopBar() { document.querySelector('#magic-stone-display span').textContent = playerState.magicStones; document.querySelector('#cat-food-display span').textContent = playerState.catFood; document.querySelector('#xp-display span').textContent = playerState.xp; }
    function getUnitDeployCost(unitId) { let cost = ALL_UNITS[unitId].cost; if (playerState.treasures['abyss_tentacle']) { cost = Math.round(cost * TREASURES['abyss_tentacle'].effect.value); } return cost; }
    
    function getUnitStats(unitId) {
        const unitData = playerState.unitLevels[unitId];
        if (!unitData) return null;
        const base = ALL_UNITS[unitId];
        const level = unitData.level;
        const enchantments = unitData.enchantments || { hp: 0, atk: 0 };
        const qualityLevel = unitData.quality || 0;
        const qualityBonus = QUALITY_CONFIG.tiers[qualityLevel].bonus;

        let hpMultiplier = 1;
        if (playerState.treasures['forest_idol']) { hpMultiplier *= TREASURES['forest_idol'].effect.value; }
        let atkMultiplier = 1;
        if (playerState.treasures['plateau_relic']) { atkMultiplier *= TREASURES['plateau_relic'].effect.value; }
        let speedMultiplier = 1;
        if (playerState.treasures['crystal_of_speed']) { speedMultiplier *= TREASURES['crystal_of_speed'].effect.value; }
        
        let hp = base.hp * (1 + (level - 1) * 0.1);
        let atk = base.atk * (1 + (level - 1) * 0.1);
        hp += base.hp * enchantments.hp * ENCHANTMENT_CONFIG.hpPerLevel;
        atk += base.atk * enchantments.atk * ENCHANTMENT_CONFIG.atkPerLevel;
        
        hp *= hpMultiplier;
        atk *= atkMultiplier;
        
        hp *= qualityBonus;
        atk *= qualityBonus;

        const speed = base.speed * speedMultiplier;
        return { ...base, cost: getUnitDeployCost(unitId), hp: Math.round(hp), atk: Math.round(atk), speed: speed, level, enchantments };
    }

    function getUpgradeCost(level) { return 50 * level * level; }
    function initBgm() { const bgm = document.getElementById('bgm'); bgm.src = 'https://s19.aconvert.com/convert/p3r68-cdx67/0eb5i-4v9v1.mp3'; bgm.volume = playerState.settings.volume; const playPromise = bgm.play(); if (playPromise !== undefined) { playPromise.then(_ => {}).catch(error => { console.log("BGM自動播放失敗，等待使用者互動。", error); }); } }
    function setVolume(volume) { playerState.settings.volume = volume; document.getElementById('bgm').volume = volume; saveGame(); }
    function showSettings(show) { document.getElementById('settings-overlay').style.display = show ? 'flex' : 'none'; if (show) { document.getElementById('volume-slider').value = playerState.settings.volume; } }
    function getCurrentLimitedPoolIndex() { const FIVE_MINUTES = 5 * 60 * 1000; return Math.floor(Date.now() / FIVE_MINUTES) % LIMITED_POOL_ROTATIONS.length; }
    function showPoolSelection() { const poolIndex = getCurrentLimitedPoolIndex(); const currentPool = LIMITED_POOL_ROTATIONS[poolIndex]; const limitedPoolBtn = document.getElementById('limited-pool-btn'); limitedPoolBtn.style.cssText = currentPool.style; document.getElementById('limited-pool-title').textContent = currentPool.name; document.getElementById('limited-pool-icon').textContent = currentPool.icon; document.getElementById('limited-pool-desc').textContent = currentPool.desc; const rateupText = currentPool.rateUp.map(id => ALL_UNITS[id].name).join(' & '); document.getElementById('limited-pool-rateup').textContent = `UP: ${rateupText}`; limitedPoolBtn.onclick = () => showPullInterface('limited'); document.getElementById('normal-pool-btn').onclick = () => showPullInterface('normal'); if (gachaTimerIntervalId) clearInterval(gachaTimerIntervalId); updateGachaCountdown(); gachaTimerIntervalId = setInterval(updateGachaCountdown, 1000); document.getElementById('gacha-pull-interface').classList.remove('active'); document.getElementById('gacha-pool-selection').classList.add('active'); document.getElementById('gacha-results').innerHTML = ''; }
    function updateGachaCountdown() { const FIVE_MINUTES = 5 * 60 * 1000; const now = Date.now(); const timeIntoInterval = now % FIVE_MINUTES; const timeLeft = FIVE_MINUTES - timeIntoInterval; if (timeLeft <= 1100) { setTimeout(showPoolSelection, 1100); } const minutes = Math.floor(timeLeft / 60000); const seconds = Math.floor((timeLeft % 60000) / 1000); const countdownEl = document.getElementById('limited-pool-countdown'); if (countdownEl) { countdownEl.textContent = `刷新倒數: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; } }
    function showPullInterface(poolType) { let config, title, poolIndex = -1; if (poolType === 'normal') { config = POOL_CONFIG.normal; title = '常駐池'; } else { poolIndex = getCurrentLimitedPoolIndex(); const currentPool = LIMITED_POOL_ROTATIONS[poolIndex]; config = { ...POOL_CONFIG.limited, ...currentPool, poolIndex }; title = currentPool.name; } document.getElementById('gacha-pull-title').textContent = title; const pull1Btn = document.getElementById('gacha-pull-1'); const pull10Btn = document.getElementById('gacha-pull-10'); pull1Btn.textContent = `單抽 (${config.costSingle}罐頭)`; pull10Btn.textContent = `十連抽 (${config.costTen}罐頭)`; pull1Btn.onclick = () => handleGachaPull(1, poolType, poolIndex); pull10Btn.onclick = () => handleGachaPull(10, poolType, poolIndex); document.querySelector('#gacha-current-food span').textContent = playerState.catFood; document.getElementById('gacha-pool-selection').classList.remove('active'); document.getElementById('gacha-pull-interface').classList.add('active'); }
    function updateUpgradeModeUI() { const btn = document.getElementById('toggle-upgrade-mode-btn'); const grid = document.getElementById('owned-units-grid'); btn.classList.toggle('active', isUpgradeMode); grid.classList.toggle('upgrade-mode-active', isUpgradeMode); const btnText = isUpgradeMode ? '🔧 編成' : '🔧 強化'; btn.innerHTML = btnText; const titleText = isUpgradeMode ? '切換為編成模式' : '切換為強化模式'; btn.setAttribute('title', titleText); }
    function handleDeckChange(unitId, action) { const isInDeck = playerState.deck.includes(unitId); if (action === 'toggle') { if (isInDeck) { playerState.deck = playerState.deck.filter(id => id !== unitId); } else if (playerState.deck.length < DECK_SIZE_LIMIT) { playerState.deck.push(unitId); } } else if (action === 'remove' && isInDeck) { playerState.deck = playerState.deck.filter(id => id !== unitId); } saveGame(); renderDeckEditor(); }
    function createUnitCard(unitId) { const unit = ALL_UNITS[unitId]; const unitData = playerState.unitLevels[unitId]; const card = document.createElement('div'); card.className = `unit-card rarity-${unit.rarity}`; card.dataset.unitId = unitId; card.innerHTML = `<div class="card-icon">${unit.icon}</div><div class="card-name">${unit.name}</div>`; if (unitData && unitData.level) { const levelDiv = document.createElement('div'); levelDiv.className = 'card-level'; let levelText = `Lv.${unitData.level}`; const totalEnchants = (unitData.enchantments?.hp || 0) + (unitData.enchantments?.atk || 0); if (totalEnchants > 0) { levelText += ` (+${totalEnchants})` } levelDiv.textContent = levelText; card.appendChild(levelDiv); } return card; }
    
    function showUpgradeModal(unitId) {
        const stats = getUnitStats(unitId);
        const cost = getUpgradeCost(stats.level);
        document.getElementById('modal-unit-name').textContent = `${stats.name} (Lv.${stats.level})`;
        document.getElementById('modal-unit-icon').textContent = stats.icon;
        document.getElementById('modal-stats').innerHTML = `<p><b>生命值:</b> ${stats.hp}</p><p><b>攻擊力:</b> ${stats.atk}</p><p><b>攻擊距離:</b> ${stats.range}</p><p><b>花費:</b> ${stats.cost}</p>`;
        const upgradeBtn = document.getElementById('modal-upgrade-btn');
        upgradeBtn.textContent = `升級 (花費 ${cost} XP)`;
        upgradeBtn.classList.toggle('disabled', playerState.xp < cost);
        upgradeBtn.onclick = () => handleUpgradeUnit(unitId);

        document.getElementById('upgrade-modal-overlay').style.display = 'flex';
    }

    function renderEnchantScreen() {
        document.querySelector('#enchant-stone-display span').textContent = playerState.magicStones;
        const grid = document.getElementById('enchant-unit-grid');
        grid.innerHTML = '';
    
        const ownedUnits = Object.keys(playerState.unitLevels)
            .sort((a, b) => {
                const rarityOrder = { 'N': 0, 'R': 1, 'SSR': 2, 'UR': 3 };
                const rarityA = ALL_UNITS[a].rarity;
                const rarityB = ALL_UNITS[b].rarity;
                if (rarityOrder[rarityB] !== rarityOrder[rarityA]) {
                    return rarityOrder[rarityB] - rarityOrder[rarityA];
                }
                return getUnitDeployCost(a) - getUnitDeployCost(b);
            });
    
        ownedUnits.forEach(unitId => {
            const unit = ALL_UNITS[unitId];
            const unitData = playerState.unitLevels[unitId];
            const costPerEnchant = ENCHANTMENT_CONFIG.cost[unit.rarity];
            const qualityRefineCost = QUALITY_CONFIG.cost[unit.rarity];
            const currentQualityIndex = unitData.quality || 0;
            const currentQuality = QUALITY_CONFIG.tiers[currentQualityIndex];
            
            const canAffordEnchant = playerState.magicStones >= costPerEnchant;
            const canAffordRefine = playerState.magicStones >= qualityRefineCost;
            
            const card = document.createElement('div');
            card.className = `enchant-card rarity-${unit.rarity}`;
    
            const canEnchantHp = unitData.enchantments.hp < ENCHANTMENT_CONFIG.maxLevel;
            const canEnchantAtk = unitData.enchantments.atk < ENCHANTMENT_CONFIG.maxLevel;
    
            card.innerHTML = `
                <div class="enchant-card-header">
                    <div class="enchant-card-icon">${unit.icon}</div>
                    <div class="enchant-card-name">${unit.name}</div>
                </div>
                <div class="enchant-stats-area">
                    <div class="enchant-stat-row">
                        <span class="stat-name">HP (+${(unitData.enchantments.hp * ENCHANTMENT_CONFIG.hpPerLevel * 100).toFixed(0)}%)</span>
                        <span class="stat-value">${unitData.enchantments.hp}/${ENCHANTMENT_CONFIG.maxLevel}</span>
                        <button class="enchant-btn ${(!canEnchantHp || !canAffordEnchant) ? 'disabled' : ''}" data-unit-id="${unitId}" data-stat="hp">+1 (${costPerEnchant}💎)</button>
                    </div>
                    <div class="enchant-stat-row">
                        <span class="stat-name">ATK (+${(unitData.enchantments.atk * ENCHANTMENT_CONFIG.atkPerLevel * 100).toFixed(0)}%)</span>
                        <span class="stat-value">${unitData.enchantments.atk}/${ENCHANTMENT_CONFIG.maxLevel}</span>
                        <button class="enchant-btn ${(!canEnchantAtk || !canAffordEnchant) ? 'disabled' : ''}" data-unit-id="${unitId}" data-stat="atk">+1 (${costPerEnchant}💎)</button>
                    </div>
                </div>
                <div class="enchant-quality-area">
                    <div class="quality-display">
                        潛在品質: <span style="color: ${currentQuality.color}; font-weight: bold;">【${currentQuality.name}】</span>
                    </div>
                    <button class="quality-refine-btn ${(!canAffordRefine || currentQualityIndex === QUALITY_CONFIG.tiers.length -1) ? 'disabled' : ''}" data-unit-id="${unitId}">潛能激發 (${qualityRefineCost}💎)</button>
                </div>
            `;
            grid.appendChild(card);
        });
    
        grid.onclick = function(e) {
            if (e.target.classList.contains('enchant-btn') && !e.target.classList.contains('disabled')) {
                const unitId = e.target.dataset.unitId;
                const stat = e.target.dataset.stat;
                handleEnchant(unitId, stat);
            }
            if (e.target.classList.contains('quality-refine-btn') && !e.target.classList.contains('disabled')) {
                const unitId = e.target.dataset.unitId;
                handleQualityRefine(unitId);
            }
        };
    }
    
    function handleEnchant(unitId, statType) {
        const unitData = playerState.unitLevels[unitId];
        const unitRarity = ALL_UNITS[unitId].rarity;
        const cost = ENCHANTMENT_CONFIG.cost[unitRarity];
        if (playerState.magicStones >= cost && unitData.enchantments[statType] < ENCHANTMENT_CONFIG.maxLevel) {
            playerState.magicStones -= cost;
            unitData.enchantments[statType]++;
            saveGame();
            updateTopBar();
            renderEnchantScreen();
        }
    }

    function handleQualityRefine(unitId) {
        const unit = ALL_UNITS[unitId];
        const unitData = playerState.unitLevels[unitId];
        if (!unit || !unitData) return;
    
        const cost = QUALITY_CONFIG.cost[unit.rarity];
        if (playerState.magicStones < cost) {
            showToast("魔法石不足！");
            return;
        }
    
        playerState.magicStones -= cost;
    
        let rand = Math.random();
        let cumulativeProb = 0;
        let chosenQualityIndex = 0;
    
        for (let i = 0; i < QUALITY_CONFIG.tiers.length; i++) {
            cumulativeProb += QUALITY_CONFIG.tiers[i].prob;
            if (rand < cumulativeProb) {
                chosenQualityIndex = i;
                break;
            }
        }
    
        const currentQualityIndex = unitData.quality || 0;
        const chosenQuality = QUALITY_CONFIG.tiers[chosenQualityIndex];
    
        if (chosenQualityIndex > currentQualityIndex) {
            unitData.quality = chosenQualityIndex;
            showToast(`潛能激發成功！品質提升為【${chosenQuality.name}】！`);
        } else {
            showToast("潛能激發失敗，品質未提升。");
        }
    
        saveGame();
        updateTopBar();
        renderEnchantScreen();
    }

    function closeUpgradeModal() { document.getElementById('upgrade-modal-overlay').style.display = 'none'; renderDeckEditor(); }
    async function handleUpgradeUnit(unitId) { const unitData = playerState.unitLevels[unitId]; const cost = getUpgradeCost(unitData.level); if (playerState.xp < cost) return; updateMissionProgress('upgrade_unit', 1); playerState.xp -= cost; unitData.level++; saveGame(); updateTopBar(); const modalContent = document.getElementById('upgrade-modal-content'); const effect = document.createElement('div'); effect.id = 'modal-level-up-effect'; effect.textContent = 'LVL UP!'; modalContent.appendChild(effect); setTimeout(() => effect.remove(), 1000); await sleep(100); showUpgradeModal(unitId); }
    
    function renderStageSelect() {
        const mainListContainer = document.getElementById('main-stages');
        const specialListContainer = document.getElementById('special-stages');
        mainListContainer.innerHTML = '';
        specialListContainer.innerHTML = '';

        for (const stageId in STAGE_CONFIG) {
            const stage = STAGE_CONFIG[stageId];
            const btn = document.createElement('button');
            btn.className = 'stage-button';
            let dropsHTML = '';
            const dropItems = [];
            if (stage.treasureDrop) {
                const treasure = TREASURES[stage.treasureDrop.id];
                const isOwned = playerState.treasures[stage.treasureDrop.id];
                dropItems.push(`${isOwned ? '✅' : '❓'} ${treasure.icon}`);
            }
            if (stage.stoneDrop) {
                dropItems.push(`💎x${stage.stoneDrop.amount}`);
            }
            if (dropItems.length > 0) {
                dropsHTML = `<div class="stage-drops">${dropItems.join(' ')}</div>`;
            }
            btn.innerHTML = ` <div> <h3>${stageId}. ${stage.name}</h3> <div class="stage-reward">獎勵: ${stage.reward.food}🥫 ${stage.reward.xp}🌟</div> </div> ${dropsHTML} `;
            btn.addEventListener('click', () => startStage(stageId, 'main'));
            mainListContainer.appendChild(btn);
        }

        for (const stageId in SPECIAL_STAGE_CONFIG) {
            const stage = SPECIAL_STAGE_CONFIG[stageId];
            const btn = document.createElement('button');
            btn.className = 'stage-button special';
            
            const record = playerState.specialStageRecords[stageId] || 0;
            let recordText = '無紀錄';
            if (record > 0) {
                const minutes = Math.floor(record / 60);
                const seconds = record % 60;
                recordText = `最高紀錄: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }

            btn.innerHTML = `
                <div>
                    <h3>${stage.name}</h3>
                    <div class="stage-reward">獎勵: 根據存活時間</div>
                    <div class="stage-drops" style="margin-top: 8px; background: rgba(255,255,255,0.2);">${recordText}</div>
                </div>
                <div class="stage-drops">⚔️ 無盡</div>
            `;
            btn.addEventListener('click', () => startStage(stageId, 'special'));
            specialListContainer.appendChild(btn);
        }

        const stageScreen = document.getElementById('stage-select-screen');
        const tabs = stageScreen.querySelectorAll('.tab-button');
        const containers = stageScreen.querySelectorAll('.stage-list-container');
        tabs.forEach(tab => {
            tab.onclick = () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetId = tab.dataset.tab;
                containers.forEach(c => {
                    c.classList.toggle('active', c.id === targetId);
                });
            };
        });
    }

    function renderTreasureScreen() { const grid = document.getElementById('treasure-grid'); grid.innerHTML = ''; for (const treasureId in TREASURES) { const treasure = TREASURES[treasureId]; const isOwned = playerState.treasures[treasureId]; const card = document.createElement('div'); card.className = `treasure-card ${isOwned ? 'owned' : ''}`; let ownedTag = isOwned ? '<div class="treasure-owned-tag">已獲得</div>' : ''; card.innerHTML = ` ${ownedTag} <div class="treasure-icon">${treasure.icon}</div> <div class="treasure-name">${treasure.name}</div> <div class="treasure-desc">${treasure.desc}</div> `; grid.appendChild(card); } }
    function renderBaseUpgradeScreen() { const cannonLevel = playerState.catCannon.level; const currentStats = CANNON_CONFIG[cannonLevel - 1]; const nextStats = CANNON_CONFIG[cannonLevel]; const display = document.getElementById('cannon-stats-display'); const upgradeBtn = document.getElementById('upgrade-cannon-btn'); let statsHTML = ` <div class="stat-block">等級: ${currentStats.level}</div> <div class="stat-block">傷害: ${currentStats.damage}</div> <div class="stat-block">擊退: ${currentStats.knockback}</div> <div class="stat-block">充能: ${currentStats.chargeTimeSec}s</div> `; if (nextStats && currentStats.upgradeCost !== Infinity) { statsHTML += ` <div class="stat-block arrow">→</div> <div class="stat-block" style="color:#2ecc71">Lv.${nextStats.level}</div> `; upgradeBtn.textContent = `升級 (花費 ${currentStats.upgradeCost} XP)`; upgradeBtn.onclick = handleUpgradeCannon; } else { upgradeBtn.textContent = '已達最高等級'; upgradeBtn.classList.add('disabled'); } display.innerHTML = statsHTML; }
    function handleUpgradeCannon() { const currentLevel = playerState.catCannon.level; const currentStats = CANNON_CONFIG[currentLevel - 1]; if (playerState.xp >= currentStats.upgradeCost) { playerState.xp -= currentStats.upgradeCost; playerState.catCannon.level++; saveGame(); updateTopBar(); renderBaseUpgradeScreen(); } else { alert('XP 不足！'); } }
    
    function startStage(stageId, type = 'main') {
        if (playerState.deck.length === 0) {
            alert("隊伍中沒有任何貓咪！請先到「隊伍編成」畫面設定隊伍。");
            return;
        }
    
        let stage, isEndless = (type === 'special');
        const survivalTimer = document.getElementById('survival-timer');
    
        if (isEndless) {
            stage = SPECIAL_STAGE_CONFIG[stageId];
            if (survivalTimer) {
                survivalTimer.style.display = 'block';
                survivalTimer.textContent = '存活時間: 00:00';
            }
        } else {
            stage = STAGE_CONFIG[stageId];
            if (survivalTimer) {
                survivalTimer.style.display = 'none';
            }
        }
    
        let cannonLevelData = { ...CANNON_CONFIG[playerState.catCannon.level - 1] };
        let moneyConfig = JSON.parse(JSON.stringify(MONEY_LEVEL_CONFIG));
        let playerBaseHp = 3000;
    
        if (playerState.treasures['grass_amulet']) { moneyConfig.forEach(level => level.max += TREASURES['grass_amulet'].effect.value); }
        if (playerState.treasures['cave_crystal']) { moneyConfig.forEach(level => level.rate = Math.round(level.rate * TREASURES['cave_crystal'].effect.value)); }
        if (playerState.treasures['volcano_heart']) { cannonLevelData.chargeTimeSec *= TREASURES['volcano_heart'].effect.value; }
        if (playerState.treasures['cosmic_map']) { playerBaseHp = Math.round(playerBaseHp * TREASURES['cosmic_map'].effect.value); }
        if (playerState.treasures['steel_blueprint']) { cannonLevelData.damage = Math.round(cannonLevelData.damage * TREASURES['steel_blueprint'].effect.value); }
        if (playerState.treasures['orb_of_power']) { cannonLevelData.knockback = Math.round(cannonLevelData.knockback * TREASURES['orb_of_power'].effect.value); }
        
        battleState = { 
            stageId, 
            stageType: type,
            isEndlessMode: isEndless,
            nextInstanceId: 0, 
            moneyLevel: 0, 
            money: 200, 
            playerBaseHp: playerBaseHp, 
            maxPlayerBaseHp: playerBaseHp, 
            enemyBaseHp: isEndless ? Infinity : stage.enemyBaseHp, 
            maxEnemyBaseHp: isEndless ? Infinity : stage.enemyBaseHp, 
            playerUnits: [], 
            enemyUnits: [], 
            enemySpawnQueue: isEndless ? [] : stage.enemies.map(e => ({ ...e, time: e.time * 1000 })).sort((a, b) => a.time - b.time), 
            isGameOver: false, 
            battleSpeed: 1, 
            lastFrameTime: performance.now(), 
            gameTime: 0, 
            isPaused: false, 
            catCannonData: cannonLevelData, 
            catCannonMaxCharge: cannonLevelData.chargeTimeSec * 1000, 
            catCannonCharge: 0, 
            moneyLevelConfig: moneyConfig, 
            totalMoneySpent: 0, 
            enemiesKilled: 0, 
            isVictoryRush: false,
        };
    
        if (isEndless) {
            battleState.endless = {
                config: stage,
                currentTierIndex: -1,
                nextSpawnTime: 5000,
                spawnPool: [...stage.initialEnemies],
                statMultiplier: 1,
                spawnInterval: 12000,
                nextBossTime: stage.boss ? stage.boss.interval : Infinity,
                bossSpawnCount: 0
            };
        }
        
        const speedBtn = document.getElementById('speed-toggle-btn');
        speedBtn.textContent = '1x';
        speedBtn.disabled = false;
        updateCannonUI();
        const battlefield = document.getElementById('battlefield');
        battlefield.className = 'battlefield';
        if (stage.background) { battlefield.classList.add(stage.background); }
        setupBattlefield();
        switchScreen('battle-screen');
        gameLoopId = requestAnimationFrame(gameLoop);
    }

    function setupBattlefield() { document.getElementById('battlefield').innerHTML = `<div id="time-stop-overlay"></div><div id="player-base" class="base"><div class="base-icon">🏰</div><div class="health-bar"><div class="health-bar-inner" style="width:100%"></div></div></div><div id="enemy-base" class="base"><div class="base-icon">🏯</div><div class="health-bar"><div class="health-bar-inner" style="width:100%"></div></div></div>`; updateDeploymentBar(); updateBattleMoneyUI(); updateBaseHealth(); }
    function updateDeploymentBar() { const bar = document.getElementById('deployment-bar'); bar.innerHTML = ''; const sortedDeck = [...playerState.deck].sort((a, b) => getUnitDeployCost(a) - getUnitDeployCost(b)); sortedDeck.forEach(unitId => { const unitData = playerState.unitLevels[unitId]; const unit = ALL_UNITS[unitId]; const cost = getUnitDeployCost(unitId); const btn = document.createElement('button'); btn.className = 'deploy-button'; btn.dataset.cost = cost; btn.innerHTML = `<div class="card-level" style="font-size:10px;top:2px;right:2px;">Lv.${unitData.level}</div><div class="card-icon" style="font-size:30px;">${unit.icon}</div><div style="font-size:12px; font-weight:bold;">${unit.name}</div><div class="deploy-cost" style="font-size:14px;">$${cost}</div>`; btn.addEventListener('click', () => deployUnit(unitId)); bar.appendChild(btn); }); }
    
    function gameLoop(currentTime) {
        if (battleState.isGameOver || battleState.isPaused) return;
        const deltaTime = (currentTime - battleState.lastFrameTime) * battleState.battleSpeed;
        battleState.lastFrameTime = currentTime;
        battleState.gameTime += deltaTime;
        
        const canStartVictoryRush = !battleState.isEndlessMode && battleState.enemySpawnQueue.length === 0 && battleState.enemyUnits.length === 0;
        if (canStartVictoryRush && !battleState.isVictoryRush) { 
            battleState.isVictoryRush = true; 
            battleState.battleSpeed = 4; 
            const speedBtn = document.getElementById('speed-toggle-btn'); 
            speedBtn.textContent = '4x'; 
            speedBtn.disabled = true; 
            showToast('攻城開始！'); 
        }
        
        const moneyConfig = battleState.moneyLevelConfig[battleState.moneyLevel]; 
        if (!battleState.lastMoneyUpdate || battleState.gameTime - battleState.lastMoneyUpdate > 1000) { 
            battleState.money = Math.min(moneyConfig.max, battleState.money + moneyConfig.rate); 
            battleState.lastMoneyUpdate = battleState.gameTime; 
            updateBattleMoneyUI(); 
        }
        
        if (battleState.catCannonCharge < battleState.catCannonMaxCharge) { 
            battleState.catCannonCharge += deltaTime; 
            updateCannonUI(); 
        }
        
        if (battleState.isEndlessMode) {
            const endless = battleState.endless;
            if (!endless) return;
    
            const survivalTimer = document.getElementById('survival-timer');
            if (survivalTimer) {
                const survivalTime = Math.floor(battleState.gameTime / 1000);
                const minutes = Math.floor(survivalTime / 60);
                const seconds = survivalTime % 60;
                survivalTimer.textContent = `存活時間: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }
    
            const nextTier = endless.config.scalingTiers[endless.currentTierIndex + 1];
            if (nextTier && battleState.gameTime >= nextTier.time) {
                endless.currentTierIndex++;
                endless.spawnPool.push(...nextTier.newEnemies);
                endless.spawnInterval = nextTier.spawnInterval;
                if(nextTier.statMultiplier) endless.statMultiplier = nextTier.statMultiplier;
                showToast(`難度提升！新敵人出現！`);
            }
    
            if (endless.config.boss && battleState.gameTime >= endless.nextBossTime) {
                endless.bossSpawnCount++;
                const bossPool = endless.config.boss.pool;
                const bossId = bossPool[(endless.bossSpawnCount - 1) % bossPool.length];
                const bossStatMultiplier = endless.statMultiplier + (endless.bossSpawnCount * endless.config.boss.statMultiplierIncrement);
                
                spawnUnit(bossId, 'enemy', 700, { statMultiplier: bossStatMultiplier });
                showToast(`BOSS來襲: ${ENEMY_UNITS[bossId].name}!`);
                
                endless.nextBossTime = battleState.gameTime + endless.config.boss.interval;
            }
    
            if (battleState.gameTime >= endless.nextSpawnTime) {
                const enemyId = endless.spawnPool[Math.floor(Math.random() * endless.spawnPool.length)];
                spawnUnit(enemyId, 'enemy', 700, { statMultiplier: endless.statMultiplier });
                endless.nextSpawnTime = battleState.gameTime + endless.spawnInterval / battleState.battleSpeed;
            }
    
        } else {
            if (battleState.enemySpawnQueue.length > 0 && battleState.gameTime >= battleState.enemySpawnQueue[0].time) {
                const enemyToSpawn = battleState.enemySpawnQueue.shift();
                spawnUnit(enemyToSpawn.type, 'enemy');
            }
        }

        const allUnits = [...battleState.playerUnits, ...battleState.enemyUnits]; for (const unit of allUnits) { const unitData = unit.team === 'player' ? getUnitStats(unit.id) : (ALL_UNITS[unit.id] || ENEMY_UNITS[unit.id]); if (unit.cursedUntil && currentTime < unit.cursedUntil) { unit.element.classList.add('cursed'); }  else if (unit.cursedUntil) { unit.cursedUntil = null; unit.element.classList.remove('cursed'); } if (unitData.lifeSpan && currentTime - unit.spawnTime > unitData.lifeSpan) { removeUnit(unit); continue; } unit.element.classList.remove('buffed', 'weakened', 'poisoned'); if (unit.buffUntil && currentTime < unit.buffUntil) { unit.element.classList.add('buffed'); } if (unit.weakenUntil && currentTime < unit.weakenUntil) { unit.element.classList.add('weakened'); } if (unit.poisonUntil && currentTime < unit.poisonUntil) { unit.element.classList.add('poisoned'); if (!unit.lastPoisonTick || currentTime - unit.lastPoisonTick > 1000) { dealDamage(unit, unit.poisonDamage, false, null, {}, currentTime); unit.lastPoisonTick = currentTime; } } else if (unit.poisonUntil) { unit.poisonUntil = null; unit.poisonDamage = null; } if (unit.frozenUntil && currentTime < unit.frozenUntil) { unit.element.classList.add('frozen'); continue; } else { unit.element.classList.remove('frozen'); unit.frozenUntil = null; } const actionInterval = (unitData.attackInterval || 1500) / battleState.battleSpeed; if (!unit.lastActionTime || currentTime - unit.lastActionTime > actionInterval) { let currentTarget = findUnitByInstanceId(unit.currentTargetId); if (!currentTarget || currentTarget.hp <= 0 || Math.abs(unit.x - currentTarget.x) > unitData.range) { unit.currentTargetId = null; const potentialTargets = unit.team === 'player' ? battleState.enemyUnits : battleState.playerUnits; let closestTarget = null, minDistance = Infinity; potentialTargets.forEach(target => { const distance = Math.abs(unit.x - target.x); if (distance <= unitData.range && distance < minDistance) { minDistance = distance; closestTarget = target; } }); if (closestTarget) { unit.currentTargetId = closestTarget.instanceId; currentTarget = closestTarget; } } if (currentTarget) { unit.isMoving = false; attack(unit, currentTarget, unit.team === 'player' ? battleState.enemyUnits : battleState.playerUnits, unitData, currentTime); } else { unit.isMoving = true; const basePos = unit.team === 'player' ? 700 : 100; if (Math.abs(unit.x - basePos) <= unitData.range) { unit.isMoving = false; attackBase(unit, unit.team === 'player' ? 'enemy' : 'player', unitData, currentTime); } } if (unitData.heal) { const healTargets = battleState.playerUnits.filter(p => p !== unit && p.hp < p.maxHp && Math.abs(p.x - unit.x) <= unitData.range); if (healTargets.length > 0) { unit.lastActionTime = currentTime; healTargets.forEach(target => { target.hp = Math.min(target.maxHp, target.hp + unitData.heal); createHealEffect(target.element, unitData.heal); updateUnitHealth(target); }); } } if (unitData.attackBuff) { const buffTargets = battleState.playerUnits.filter(p => p !== unit && Math.abs(p.x - unit.x) <= unitData.attackBuff.radius); if (buffTargets.length > 0) { unit.lastActionTime = currentTime; buffTargets.forEach(target => { target.buffUntil = currentTime + unitData.attackBuff.duration; target.buffMultiplier = unitData.attackBuff.multiplier; }); } } } if (unit.isMoving) { const speed = unitData.speed, direction = unit.team === 'player' ? 1 : -1; unit.x += speed * direction * (deltaTime / 16.67); } } 
        updateUnitsPosition(); 
        if (battleState.playerBaseHp <= 0) endGame(false); 
        if (!battleState.isEndlessMode && battleState.enemyBaseHp <= 0) endGame(true); 
        if (!battleState.isGameOver) gameLoopId = requestAnimationFrame(gameLoop); 
    }

    function findUnitByInstanceId(id) { if (id == null) return null; return battleState.playerUnits.find(u => u.instanceId === id) || battleState.enemyUnits.find(u => u.instanceId === id); }
    function attack(attacker, mainTarget, allTargets, attackerData, currentTime) { attacker.lastActionTime = currentTime; const targetData = mainTarget.team === 'player' ? getUnitStats(mainTarget.id) : (ALL_UNITS[mainTarget.id] || ENEMY_UNITS[mainTarget.id]); if (targetData.dodgeChance && Math.random() < targetData.dodgeChance) { createDamageTextEffect(mainTarget.element, 'MISS', '#ffffff'); return; } if (targetData.blockChance && Math.random() < targetData.blockChance && !(attacker.cursedUntil && currentTime < attacker.cursedUntil)) { mainTarget.element.classList.add('blocking'); setTimeout(() => mainTarget.element.classList.remove('blocking'), 300); return; } if (attackerData.timeStop && Math.random() < attackerData.timeStop.chance) { showTimeStopEffect(); battleState.enemyUnits.forEach(enemy => enemy.frozenUntil = currentTime + attackerData.timeStop.duration); } if (attackerData.multiHit) { for (let i = 0; i < attackerData.multiHit.count; i++) { setTimeout(() => performSingleHit(attacker, mainTarget, allTargets, attackerData, currentTime), i * attackerData.multiHit.delay); } } else { performSingleHit(attacker, mainTarget, allTargets, attackerData, currentTime); } }
    
    function performSingleHit(attacker, mainTarget, allTargets, attackerData, currentTime) {
        if (!mainTarget || mainTarget.hp <= 0) return;
        let actualAtk = attackerData.atk;
        if (attacker.buffUntil && currentTime < attacker.buffUntil) {
            actualAtk *= attacker.buffMultiplier;
        }
        if (attacker.weakenUntil && currentTime < attacker.weakenUntil) {
            actualAtk *= attacker.weakenMultiplier;
        }
        let isCrit = false;
        if (attackerData.crit && Math.random() < attackerData.crit.chance && !(mainTarget.cursedUntil && currentTime < mainTarget.cursedUntil)) {
            actualAtk = Math.round(actualAtk * attackerData.crit.multiplier);
            isCrit = true;
        }
        const originalHp = mainTarget.hp;
        if (attackerData.splashRange) {
            allTargets.filter(t => t.hp > 0 && Math.abs(t.x - mainTarget.x) <= attackerData.splashRange).forEach(target => dealDamage(target, actualAtk, isCrit, attacker, attackerData, currentTime));
        } else {
            dealDamage(mainTarget, actualAtk, isCrit, attacker, attackerData, currentTime);
        }
        const killedTarget = originalHp > 0 && mainTarget.hp <= 0;
        if (killedTarget && attackerData.moneyOnKill && Math.random() < attackerData.moneyOnKill.chance) {
            battleState.money = Math.min(battleState.moneyLevelConfig[battleState.moneyLevel].max, battleState.money + attackerData.moneyOnKill.amount);
            updateBattleMoneyUI();
        }
        if (attackerData.waveAttack && Math.random() < attackerData.waveAttack.chance) {
            const direction = attacker.team === 'player' ? 1 : -1;
            const waveTargets = (attacker.team === 'player' ? battleState.enemyUnits : battleState.playerUnits).filter(u => direction * (u.x - attacker.x) > 0 && direction * (u.x - attacker.x) < attackerData.waveAttack.distance);
            waveTargets.forEach(target => setTimeout(() => dealDamage(target, actualAtk, false, attacker, attackerData, currentTime), 100));
        }
        if (attackerData.freeze && Math.random() < attackerData.freeze.chance) {
            mainTarget.frozenUntil = currentTime + attackerData.freeze.duration;
        }
        if (attackerData.weaken && Math.random() < attackerData.weaken.chance) {
            mainTarget.weakenUntil = currentTime + attackerData.weaken.duration;
            mainTarget.weakenMultiplier = attackerData.weaken.multiplier;
        }
        if (attackerData.poison && Math.random() < attackerData.poison.chance) {
            mainTarget.poisonUntil = currentTime + attackerData.poison.duration;
            mainTarget.poisonDamage = attackerData.poison.damage;
            mainTarget.lastPoisonTick = currentTime;
        }
        if (attackerData.knockback && Math.random() < attackerData.knockback.chance) {
            mainTarget.x += (mainTarget.team === 'player' ? -30 : 30);
        }
        if (attackerData.curse && Math.random() < attackerData.curse.chance) {
            mainTarget.cursedUntil = currentTime + attackerData.curse.duration;
        }
    }
    
    function dealDamage(target, damage, isCrit, attacker, attackerData, currentTime) {
        if (!target || target.hp <= 0) return;
        let finalDamage = damage;
        const targetData = target.team === 'player' ? getUnitStats(target.id) : (ALL_UNITS[target.id] || ENEMY_UNITS[target.id]);
        if (target.barrier > 0) {
            target.barrier--;
            target.element.classList.add('shielded');
            setTimeout(() => target.element.classList.remove('shielded'), 300);
            return;
        }
        if (targetData.damageReduction && Math.random() < targetData.damageReduction.chance && !(attacker.cursedUntil && currentTime < attacker.cursedUntil)) {
            finalDamage *= (1 - targetData.damageReduction.multiplier);
            createDamageTextEffect(target.element, 'GUARD', '#87ceeb');
        }
        finalDamage = Math.round(finalDamage);
        target.hp -= finalDamage;
        createDamageTextEffect(target.element, finalDamage, isCrit ? '#ff4757' : '#fff');
        if (target.hp <= 0) {
            if (attacker && attackerData.summonOnKill && Math.random() < attackerData.summonOnKill.chance) {
                spawnUnit(attackerData.summonOnKill.unitId, attacker.team, target.x);
            }
            if (target.team === 'enemy') {
                updateMissionProgress('kill_enemies', 1);
            }
            removeUnit(target);
        } else {
            updateUnitHealth(target);
        }
    }
    
    function attackBase(attacker, baseTeam, attackerData, currentTime) {
        attacker.lastActionTime = currentTime;
        const targetBaseElement = document.getElementById(`${baseTeam}-base`);
        let actualAtk = attackerData.atk;
        if (attacker.buffUntil && currentTime < attacker.buffUntil) {
            actualAtk *= attacker.buffMultiplier;
        }
        if (attacker.weakenUntil && currentTime < attacker.weakenUntil) {
            actualAtk *= attacker.weakenMultiplier;
        }
        if (baseTeam === 'player' && playerState.treasures['celestial_shield']) {
            actualAtk *= TREASURES['celestial_shield'].effect.value;
        }
        actualAtk = Math.round(actualAtk);
        createDamageTextEffect(targetBaseElement, actualAtk, false);
        if (baseTeam === 'enemy') {
            battleState.enemyBaseHp -= actualAtk;
        } else {
            battleState.playerBaseHp -= actualAtk;
        }
        updateBaseHealth();
    }

    function deployUnit(unitId) { const cost = getUnitDeployCost(unitId); if (battleState.money >= cost) { battleState.money -= cost; battleState.totalMoneySpent += cost; updateMissionProgress('spend_money', cost); updateBattleMoneyUI(); spawnUnit(unitId, 'player'); } }
    
    function spawnUnit(id, team, spawnX = null, options = {}) {
        const isPlayer = team === 'player';
        let unitData = isPlayer ? getUnitStats(id) : (ALL_UNITS[id] || ENEMY_UNITS[id]);

        if (team === 'enemy' && !unitData.isMinion && !playerState.seenEnemies.has(id)) {
            playerState.seenEnemies.add(id);
            updateCollectionBookBadge();
            saveGame();
        }
        
        if (options.statMultiplier && options.statMultiplier > 1) {
            unitData = {
                ...unitData,
                hp: Math.round(unitData.hp * options.statMultiplier),
                atk: Math.round(unitData.atk * options.statMultiplier)
            };
        }

        const element = document.createElement('div');
        element.className = 'unit';
        element.innerHTML = `<div>${unitData.icon}</div><div class="unit-health-bar"><div class="unit-health-bar-inner"></div></div>`;
        const unitInstance = { id, team, element, instanceId: battleState.nextInstanceId++, currentTargetId: null, hp: unitData.hp, maxHp: unitData.hp, x: spawnX !== null ? spawnX : (isPlayer ? 100 : 700), isMoving: true, spawnTime: performance.now(), barrier: unitData.barrier || 0, };
        document.getElementById('battlefield').appendChild(element);
        if (isPlayer) battleState.playerUnits.push(unitInstance);
        else battleState.enemyUnits.push(unitInstance);
    }
    
    function removeUnit(unitToRemove) { if (unitToRemove.element) unitToRemove.element.remove(); if (unitToRemove.team === 'player') battleState.playerUnits = battleState.playerUnits.filter(u => u.instanceId !== unitToRemove.instanceId); else battleState.enemyUnits = battleState.enemyUnits.filter(u => u.instanceId !== unitToRemove.instanceId); }
    
    function endGame(isVictory) {
        battleState.isGameOver = true;
        cancelAnimationFrame(gameLoopId);
        const survivalTimer = document.getElementById('survival-timer');
        if (survivalTimer) {
            survivalTimer.style.display = 'none';
        }
        const overlay = document.getElementById('game-over-overlay');
        const title = document.getElementById('game-over-title');
        const rewardText = document.getElementById('game-over-reward');
        const treasureDropText = document.getElementById('game-over-treasure-drop');
        treasureDropText.innerHTML = '';

        if (battleState.isEndlessMode) {
            const survivalTime = Math.floor(battleState.gameTime / 1000);
            const config = battleState.endless.config;
            const foodReward = Math.floor(survivalTime * config.rewardPerSecond.food);
            const xpReward = Math.floor(survivalTime * config.rewardPerSecond.xp);

            const currentRecord = playerState.specialStageRecords[battleState.stageId] || 0;
            if (survivalTime > currentRecord) {
                playerState.specialStageRecords[battleState.stageId] = survivalTime;
                showToast(`新紀錄！你存活了 ${survivalTime} 秒！`);
            }

            playerState.catFood += foodReward;
            playerState.xp += xpReward;

            title.textContent = "挑戰結束";
            rewardText.innerHTML = `你存活了 <b>${survivalTime}</b> 秒！<br>獲得 🥫x${foodReward}, 🌟x${xpReward}`;
            updateTopBar();
            saveGame();
            overlay.classList.add('active');
            return;
        }
        
        if (isVictory) {
            const stage = STAGE_CONFIG[battleState.stageId];
            let reward = stage.reward;
            let xpMultiplier = 1;
            if (playerState.treasures['dark_crown']) xpMultiplier = TREASURES['dark_crown'].effect.value;
            const finalXp = Math.round(reward.xp * xpMultiplier);
            playerState.catFood += reward.food;
            playerState.xp += finalXp;
            title.textContent = "勝利！";
            let extraRewards = [];
            if (stage.stoneDrop && Math.random() < stage.stoneDrop.chance) {
                const amount = stage.stoneDrop.amount;
                playerState.magicStones += amount;
                extraRewards.push(`💎x${amount}`);
            }
            rewardText.textContent = `獲得 🥫x${reward.food}, 🌟x${finalXp}` + (extraRewards.length > 0 ? `, ${extraRewards.join(', ')}` : '');
            updateMissionProgress('win_stages', 1);
            if (stage.treasureDrop && !playerState.treasures[stage.treasureDrop.id] && Math.random() < stage.treasureDrop.chance) {
                const treasureId = stage.treasureDrop.id;
                playerState.treasures[treasureId] = true;
                const treasure = TREASURES[treasureId];
                treasureDropText.innerHTML = `✨ 獲得寶物：${treasure.name} ${treasure.icon} ✨`;
            }
            updateTopBar();
            saveGame();
        } else {
            title.textContent = "失敗...";
            rewardText.textContent = `再接再厲！`;
        }
        overlay.classList.add('active');
    }

    function togglePause(pause) { battleState.isPaused = pause; document.getElementById('pause-overlay').style.display = pause ? 'flex' : 'none'; if (pause) { cancelAnimationFrame(gameLoopId); } else { battleState.lastFrameTime = performance.now(); gameLoopId = requestAnimationFrame(gameLoop); } }
    function quitBattle() { battleState.isGameOver = true; cancelAnimationFrame(gameLoopId); togglePause(false); switchScreen('hub-screen'); }
    function fireCatCannon() { 
        if (battleState.catCannonCharge < battleState.catCannonMaxCharge || battleState.isPaused || battleState.isGameOver) return; 
        const cannonStats = battleState.catCannonData; 
        battleState.catCannonCharge = 0; 
        updateCannonUI(); 
        const laser = document.createElement('div'); 
        laser.className = 'cannon-laser'; 
        document.getElementById('battlefield').appendChild(laser); 
        setTimeout(() => laser.remove(), 300); 
        battleState.enemyUnits.forEach(enemy => {
            if (enemy.hp > 0) {
                dealDamage(enemy, cannonStats.damage, false, null, {}, performance.now());
                const stillAliveEnemy = findUnitByInstanceId(enemy.instanceId);
                if (stillAliveEnemy) {
                    stillAliveEnemy.x += cannonStats.knockback;
                    if (stillAliveEnemy.x > 700) stillAliveEnemy.x = 700;
                }
            }
        });
        updateUnitsPosition(); 
    }
    function updateCannonUI() { const btn = document.getElementById('fire-cannon-btn'); const chargeBar = document.getElementById('cannon-charge-bar'); const chargePercentage = Math.min(100, (battleState.catCannonCharge / battleState.catCannonMaxCharge) * 100); chargeBar.style.height = `${chargePercentage}%`; btn.classList.toggle('disabled', chargePercentage < 100); }
    function updateBattleMoneyUI() { const moneyConfig = battleState.moneyLevelConfig[battleState.moneyLevel]; document.querySelector('#money-display').textContent = `金錢: $${battleState.money} / ${moneyConfig.max}`; document.querySelector('#money-level-display').textContent = `錢包 Lv: ${battleState.moneyLevel + 1}`; const upgradeBtn = document.getElementById('upgrade-money-btn'); const nextLevelConfig = battleState.moneyLevelConfig[battleState.moneyLevel + 1]; if (nextLevelConfig && nextLevelConfig.cost !== Infinity) { upgradeBtn.textContent = `升級 ($${nextLevelConfig.cost})`; upgradeBtn.classList.toggle('disabled', battleState.money < nextLevelConfig.cost); } else { upgradeBtn.textContent = '已滿級'; upgradeBtn.classList.add('disabled'); } document.querySelectorAll('.deploy-button').forEach(btn => { btn.classList.toggle('disabled', battleState.money < parseInt(btn.dataset.cost)); }); }
    function handleUpgradeMoney() { const nextLevel = battleState.moneyLevel + 1; const nextLevelConfig = battleState.moneyLevelConfig[nextLevel]; if (nextLevelConfig) { const cost = nextLevelConfig.cost; if (battleState.money >= cost) { battleState.money -= cost; battleState.moneyLevel = nextLevel; updateBattleMoneyUI(); } } }
    function toggleBattleSpeed() { if (battleState.isVictoryRush) return; if (battleState.battleSpeed === 1) { battleState.battleSpeed = 2; document.getElementById('speed-toggle-btn').textContent = '2x'; } else { battleState.battleSpeed = 1; document.getElementById('speed-toggle-btn').textContent = '1x'; } }
    function createDamageTextEffect(targetElement, text, color) { const effect = document.createElement('div'); effect.className = 'damage-text'; effect.textContent = text; effect.style.color = color; const rect = targetElement.getBoundingClientRect(); const gameRect = document.getElementById('game-container').getBoundingClientRect(); effect.style.left = `${rect.left - gameRect.left + rect.width / 2 - 15}px`; effect.style.top = `${rect.top - gameRect.top + rect.height / 2 - 30}px`; document.getElementById('battlefield').appendChild(effect); setTimeout(() => effect.remove(), 800); }
    function createHealEffect(targetElement, amount) { const effect = document.createElement('div'); effect.className = 'heal-effect'; effect.textContent = `+${amount}`; const rect = targetElement.getBoundingClientRect(); const gameRect = document.getElementById('game-container').getBoundingClientRect(); effect.style.left = `${rect.left - gameRect.left + rect.width / 2 - 15}px`; effect.style.top = `${rect.top - gameRect.top + rect.height / 2 - 30}px`; document.getElementById('battlefield').appendChild(effect); setTimeout(() => effect.remove(), 800); }
    function showTimeStopEffect() { const overlay = document.getElementById('time-stop-overlay'); overlay.style.display = 'block'; setTimeout(() => { overlay.style.display = 'none'; }, 500); }
    function updateUnitsPosition() { [...battleState.playerUnits, ...battleState.enemyUnits].forEach(unit => { if(unit.element) unit.element.style.left = `${unit.x - 20}px`; }); }
    function updateUnitHealth(unit) { if (unit.element) { const healthPercentage = Math.max(0, (unit.hp / unit.maxHp) * 100); unit.element.querySelector('.unit-health-bar-inner').style.width = `${healthPercentage}%`; } }
    function updateBaseHealth() { document.querySelector('#player-base .health-bar-inner').style.width = `${Math.max(0, (battleState.playerBaseHp / battleState.maxPlayerBaseHp) * 100)}%`; document.querySelector('#enemy-base .health-bar-inner').style.width = `${Math.max(0, (battleState.enemyBaseHp / battleState.maxEnemyBaseHp) * 100)}%`; }
    function showDailyModal(show, defaultTab = 'missions') { const overlay = document.getElementById('daily-modal-overlay'); overlay.style.display = show ? 'flex' : 'none'; if (show) { renderDailyModal(); switchTab(defaultTab); } }
    function renderDailyModal() { renderLoginRewards(); renderMissions(); updateNotificationBadge(); }
    function renderLoginRewards() { const grid = document.getElementById('login-rewards-grid'); grid.innerHTML = ''; const streak = playerState.loginStreak; const lastClaimed = playerState.lastClaimedStreak || 0; for (let i = 0; i < 7; i++) { const day = i + 1; const reward = LOGIN_REWARDS[i]; const item = document.createElement('div'); item.className = 'login-reward-item'; if (day <= lastClaimed) { item.classList.add('claimed'); } else if (day <= streak) { item.classList.add('today'); item.style.cursor = 'pointer'; item.addEventListener('click', () => claimLoginReward(day)); } item.innerHTML = ` <div class="day">第 ${day} 天</div> <div class="reward-icon">${reward.icon}</div> <div class="reward-text">+${reward.value} ${reward.type === 'food' ? '🥫' : '🌟'}</div> `; grid.appendChild(item); } }
    function claimLoginReward(day) { if (day > playerState.loginStreak || day <= (playerState.lastClaimedStreak || 0)) return; const reward = LOGIN_REWARDS[day - 1]; if (reward.type === 'food') { playerState.catFood += reward.value; } else { playerState.xp += reward.value; } playerState.lastClaimedStreak = day; showToast(`領取成功！+${reward.value} ${reward.type === 'food' ? '罐頭' : 'XP'}`); updateTopBar(); renderLoginRewards(); saveGame(); }
    function renderMissions() { const list = document.getElementById('mission-list'); list.innerHTML = ''; playerState.dailyMissions.forEach((mission, index) => { const template = MISSION_POOL.find(m => m.id === mission.id); if (!template) return; const item = document.createElement('div'); item.className = 'mission-item'; const canClaim = mission.progress >= mission.target && !mission.claimed; const reward = template.reward; const rewardIcon = reward.type === 'food' ? '🥫' : (reward.type === 'stones' ? '💎' : '🌟'); item.innerHTML = ` <div class="mission-desc">${template.text(mission.target)}</div> <div class="mission-progress">${mission.progress}/${mission.target}</div> <button class="mission-claim-btn ${canClaim ? '' : 'disabled'}" data-index="${index}"> ${rewardIcon} +${reward.value} </button> `; list.appendChild(item); }); }
    function claimMission(index) { const mission = playerState.dailyMissions[index]; if (mission && mission.progress >= mission.target && !mission.claimed) { const template = MISSION_POOL.find(m => m.id === mission.id); const reward = template.reward; let rewardText = ''; if (reward.type === 'food') { playerState.catFood += reward.value; rewardText = `+${reward.value} 罐頭`; } else if (reward.type === 'xp') { playerState.xp += reward.value; rewardText = `+${reward.value} XP`; } mission.claimed = true; showToast(`任務完成！${rewardText}`); updateTopBar(); saveGame(); renderMissions(); updateNotificationBadge(); } }
    function switchTab(tabName) { document.querySelectorAll('#daily-modal-overlay .tab-button').forEach(btn => btn.classList.remove('active')); document.querySelector(`#daily-modal-overlay .tab-button[data-tab="${tabName}"]`).classList.add('active'); document.querySelectorAll('#daily-modal-overlay .tab-content').forEach(content => content.classList.remove('active')); document.getElementById(`${tabName}-tab`).classList.add('active'); }
    function renderCollectionBook() { renderCollectionGrid('player-units', ALL_UNITS, playerState.unlockedUnits, playerState.collectionRewards.units); renderCollectionGrid('enemy-units', ENEMY_UNITS, playerState.seenEnemies, playerState.collectionRewards.enemies); updateCollectionBookBadge(); }
    function renderCollectionGrid(tabId, source, unlockedSet, claimedSet) { const grid = document.getElementById(`${tabId}-tab`); grid.innerHTML = ''; Object.keys(source).filter(id => !source[id].isMinion).forEach(id => { const itemData = source[id]; const isUnlocked = unlockedSet.has(id); const isClaimed = claimedSet.has(id); const item = document.createElement('div'); item.className = `collection-item ${isUnlocked ? '' : 'locked'}`; item.dataset.unitId = id; item.innerHTML = ` <div class="item-icon">${isUnlocked ? itemData.icon : '❓'}</div> <div class="item-name">${isUnlocked ? itemData.name : '未發現'}</div> `; if (isUnlocked && !isClaimed) { const claimBtn = document.createElement('button'); claimBtn.className = 'reward-claim-button'; claimBtn.textContent = '🎁'; claimBtn.title = `領取 ${COLLECTION_REWARD_AMOUNT} 罐頭`; claimBtn.addEventListener('click', (e) => { e.stopPropagation(); claimCollectionReward(id, tabId.includes('player') ? 'units' : 'enemies'); }); item.appendChild(claimBtn); } grid.appendChild(item); }); }
    function claimCollectionReward(id, type) { if (!playerState.collectionRewards[type].has(id)) { playerState.collectionRewards[type].add(id); playerState.catFood += COLLECTION_REWARD_AMOUNT; showToast(`領取成功！+${COLLECTION_REWARD_AMOUNT} 罐頭`); updateTopBar(); renderCollectionBook(); saveGame(); } }
    function claimAllCollectionRewards() { let totalClaimed = 0; const types = ['units', 'enemies']; types.forEach(type => { const unlockedSet = type === 'units' ? playerState.unlockedUnits : playerState.seenEnemies; unlockedSet.forEach(id => { if (!playerState.collectionRewards[type].has(id)) { playerState.collectionRewards[type].add(id); totalClaimed++; } }); }); if (totalClaimed > 0) { const totalReward = totalClaimed * COLLECTION_REWARD_AMOUNT; playerState.catFood += totalReward; showToast(`一鍵領取 ${totalClaimed} 項獎勵，共獲得 ${totalReward} 罐頭！`); updateTopBar(); renderCollectionBook(); saveGame(); } else { showToast('沒有可領取的獎勵'); } }
    function updateCollectionBookBadge() { let hasClaimable = false; playerState.unlockedUnits.forEach(id => { if (!playerState.collectionRewards.units.has(id)) hasClaimable = true; }); if (!hasClaimable) { playerState.seenEnemies.forEach(id => { if (!playerState.collectionRewards.enemies.has(id)) hasClaimable = true; }); } const badge = document.querySelector('#go-to-collection-book-button .notification-badge'); if(badge) badge.style.display = hasClaimable ? 'flex' : 'none'; }
    function renderShopScreen() { const grid = document.getElementById('shop-grid'); grid.innerHTML = ''; for (const itemId in SHOP_ITEMS) { const item = SHOP_ITEMS[itemId]; const card = document.createElement('div'); card.className = 'shop-item-card'; const buyBtn = document.createElement('button'); buyBtn.className = 'shop-buy-btn'; buyBtn.textContent = `購買 (${item.cost} 🥫)`; buyBtn.addEventListener('click', () => handlePurchase(itemId)); if (playerState.catFood < item.cost) { buyBtn.classList.add('disabled'); } const rewardIcon = item.reward.type === 'xp' ? '🌟' : '💎'; const rewardText = `${rewardIcon} +${item.reward.value.toLocaleString()}`; card.innerHTML = ` <div class="shop-item-icon">${item.icon}</div> <div class="shop-item-name">${item.name}</div> <div class="shop-item-reward">${rewardText}</div> <div class="shop-item-desc">${item.desc}</div> `; const buySection = document.createElement('div'); buySection.className = 'shop-item-buy-section'; buySection.appendChild(buyBtn); card.appendChild(buySection); grid.appendChild(card); } }
    function handlePurchase(itemId) { const item = SHOP_ITEMS[itemId]; if (playerState.catFood < item.cost) { showToast('貓罐頭不足！'); return; } playerState.catFood -= item.cost; let rewardText = ''; if (item.reward.type === 'xp') { playerState.xp += item.reward.value; rewardText = `+${item.reward.value.toLocaleString()} 🌟`; } else if (item.reward.type === 'magicStones') { playerState.magicStones += item.reward.value; rewardText = `+${item.reward.value.toLocaleString()} 💎`; } showToast(`購買成功！ ${rewardText}`); updateTopBar(); saveGame(); renderShopScreen(); }
    function toggleFullscreen() { const gameContainer = document.getElementById('game-container'); if (!document.fullscreenElement) { gameContainer.requestFullscreen().catch(err => { /* Do nothing, fail silently on iOS */ }); } else { document.exitFullscreen(); } }
    function showMenuModal(show) { document.getElementById('menu-modal-overlay').style.display = show ? 'flex' : 'none'; }
    function handleCollectionItemClick(event, type) { const item = event.target.closest('.collection-item'); if (item && item.dataset.unitId) { showCollectionDetailModal(item.dataset.unitId, type); } }
    function showCollectionDetailModal(unitId, type) { const unitData = (type === 'player') ? ALL_UNITS[unitId] : ENEMY_UNITS[unitId]; if (!unitData) return; document.getElementById('modal-detail-unit-name').textContent = unitData.name; document.getElementById('modal-detail-unit-icon').textContent = unitData.icon; const statsDiv = document.getElementById('modal-detail-stats'); const rarityText = unitData.rarity ? `<span class="rarity-${unitData.rarity}">${unitData.rarity}</span>` : '敵方'; statsDiv.innerHTML = ` <p><b>稀有度:</b> ${rarityText}</p> <p><b>體力:</b> ${unitData.hp}</p> <p><b>攻擊力:</b> ${unitData.atk}</p> <p><b>射程:</b> ${unitData.range}</p> ${unitData.cost ? `<p><b>花費:</b> ${unitData.cost}</p>` : ''} `; const descDiv = document.getElementById('modal-detail-unit-desc'); descDiv.innerHTML = generateUnitDescription(unitData); document.getElementById('collection-detail-modal-overlay').style.display = 'flex'; }
    function hideCollectionDetailModal() { document.getElementById('collection-detail-modal-overlay').style.display = 'none'; }
    function generateUnitDescription(unitData) { const descriptions = []; if (unitData.splashRange) descriptions.push(`攻擊可對目標周圍 ${unitData.splashRange} 範圍內的敵人造成傷害。`); if (unitData.waveAttack) descriptions.push(`${(unitData.waveAttack.chance * 100)}% 機率發動波動攻擊，傷害前方 ${unitData.waveAttack.distance} 距離內所有敵人。`); if (unitData.multiHit) descriptions.push(`一次攻擊可造成 ${unitData.multiHit.count} 次傷害。`); if (unitData.crit) descriptions.push(`${(unitData.crit.chance * 100)}% 機率造成 ${unitData.crit.multiplier} 倍爆擊傷害。`); if (unitData.knockback) descriptions.push(`${(unitData.knockback.chance * 100)}% 機率擊退敵人。`); if (unitData.freeze) descriptions.push(`${(unitData.freeze.chance * 100)}% 機率凍結敵人 ${unitData.freeze.duration / 1000} 秒。`); if (unitData.weaken) descriptions.push(`${(unitData.weaken.chance * 100)}% 機率弱化敵人，使其攻擊力降為 ${(unitData.weaken.multiplier * 100)}%，持續 ${unitData.weaken.duration / 1000} 秒。`); if (unitData.poison) descriptions.push(`${(unitData.poison.chance * 100)}% 機率使敵人中毒，每秒造成 ${unitData.poison.damage} 點傷害，持續 ${unitData.poison.duration / 1000} 秒。`); if (unitData.curse) descriptions.push(`${(unitData.curse.chance * 100)}% 機率詛咒敵人，使其特殊能力（如爆擊、格擋）失效，持續 ${unitData.curse.duration / 1000} 秒。`); if (unitData.timeStop) descriptions.push(`${(unitData.timeStop.chance * 100)}% 機率暫停敵方時間 ${unitData.timeStop.duration / 1000} 秒。`); if (unitData.heal) descriptions.push(`可治療範圍內我方單位，每秒恢復 ${unitData.heal} 點生命。`); if (unitData.attackBuff) descriptions.push(`可強化範圍內我方單位，提升 ${((unitData.attackBuff.multiplier - 1) * 100).toFixed(0)}% 攻擊力，持續 ${unitData.attackBuff.duration / 1000} 秒。`); if (unitData.moneyOnKill) descriptions.push(`擊敗敵人時，有 ${(unitData.moneyOnKill.chance * 100)}% 機率獲得 $${unitData.moneyOnKill.amount}。`); if (unitData.summonOnKill) { const summoned = ALL_UNITS[unitData.summonOnKill.unitId]; descriptions.push(`擊敗敵人時，有 ${(unitData.summonOnKill.chance * 100)}% 機率召喚一隻「${summoned.name}」。`); } if (unitData.blockChance) descriptions.push(`有 ${(unitData.blockChance * 100)}% 機率格檔所有傷害。`); if (unitData.dodgeChance) descriptions.push(`有 ${(unitData.dodgeChance * 100)}% 機率閃避攻擊。`); if (unitData.damageReduction) descriptions.push(`有 ${(unitData.damageReduction.chance * 100)}% 機率使受到的傷害減少 ${((1 - unitData.damageReduction.multiplier) * 100)}%。`); if (unitData.barrier) descriptions.push(`擁有 ${unitData.barrier} 層護盾，可抵擋同等次數的攻擊。`); if (unitData.lifeSpan) descriptions.push(`此單位只能在場上存在 ${unitData.lifeSpan / 1000} 秒。`); if (descriptions.length === 0) { return '<h4>特殊能力</h4><p>沒有特殊能力。</p>'; } return `<h4>特殊能力</h4><ul><li>${descriptions.join('</li><li>')}</li></ul>`; }
    
    function checkForIOS() {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone);
        const hasSeenGuide = localStorage.getItem('hasSeenIosGuide');

        if (isIOS && !isInStandaloneMode && !hasSeenGuide) {
            const iosGuideOverlay = document.getElementById('ios-guide-overlay');
            if (iosGuideOverlay) {
                iosGuideOverlay.style.display = 'flex';
            }
        }
    }
    
    function init() { 
        loadGame(); 
        setupEventListeners(); 
        switchScreen('start-screen');
        checkForIOS();
    }
    
    init();
});