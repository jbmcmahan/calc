"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
var helper_1 = require("./helper");
describe('calc', function () {
    describe('Multi-Gen', function () {
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Night Shade / Seismic Toss (gen ".concat(gen, ")"), function () {
                var e_1, _a;
                var mew = Pokemon('Mew', { level: 50 });
                var vulpix = Pokemon('Vulpix');
                try {
                    for (var _b = __values([Move('Seismic Toss'), Move('Night Shade')]), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var move = _c.value;
                        var result = calculate(mew, vulpix, move);
                        expect(result.damage).toBe(50);
                        expect(result.desc()).toBe(gen < 3
                            ? "Lvl 50 Mew ".concat(move.name, " vs. Vulpix: 50-50 (17.9 - 17.9%) -- guaranteed 6HKO")
                            : "Lvl 50 Mew ".concat(move.name, " vs. 31 HP Vulpix: 50-50 (23 - 23%) -- guaranteed 5HKO"));
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Immunity (gen ".concat(gen, ")"), function () {
                expect(calculate(Pokemon('Snorlax'), Pokemon('Gengar'), Move('Hyper Beam')).damage).toBe(0);
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Non-damaging (gen ".concat(gen, ")"), function () {
                var result = calculate(Pokemon('Snorlax'), Pokemon('Vulpix'), Move('Barrier'));
                expect(result.damage).toBe(0);
                expect(result.desc()).toBe('Snorlax Barrier vs. Vulpix: 0-0 (0 - 0%)');
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move, Field = _a.Field;
            test("Protect (gen ".concat(gen, ")"), function () {
                var field = Field({ defenderSide: { isProtected: true } });
                var snorlax = Pokemon('Snorlax');
                var chansey = Pokemon('Chansey');
                expect(calculate(snorlax, chansey, Move('Hyper Beam'), field).damage).toBe(0);
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move, Field = _a.Field;
            test("Critical hits ignore attack decreases (gen ".concat(gen, ")"), function () {
                var field = Field({ defenderSide: { isReflect: true } });
                var mew = Pokemon('Mew', { status: 'brn' });
                var vulpix = Pokemon('Vulpix');
                var explosion = Move('Explosion', { isCrit: true });
                var result = calculate(mew, vulpix, explosion, field);
                mew.boosts.atk = 2;
                vulpix.boosts.def = 2;
                if (gen < 2) {
                    expect(result.range()).toEqual([799, 939]);
                    expect(result.desc()).toBe('Mew Explosion vs. Vulpix on a critical hit: 799-939 (286.3 - 336.5%) -- guaranteed OHKO');
                }
                else if (gen < 5 && gen > 2) {
                    expect(result.range()).toEqual([729, 858]);
                    expect(result.desc()).toBe('0 Atk burned Mew Explosion vs. 0 HP / 0 Def Vulpix on a critical hit: 729-858 (335.9 - 395.3%) -- guaranteed OHKO');
                }
                else if (gen === 5) {
                    expect(result.range()).toEqual([364, 429]);
                    expect(result.desc()).toBe('0 Atk burned Mew Explosion vs. 0 HP / 0 Def Vulpix on a critical hit: 364-429 (167.7 - 197.6%) -- guaranteed OHKO');
                }
                else if (gen >= 6) {
                    expect(result.range()).toEqual([545, 642]);
                    expect(result.desc()).toBe('31 Atk burned Mew Explosion vs. 31 HP / 31 Def Vulpix on a critical hit: 545-642 (251.1 - 295.8%) -- guaranteed OHKO');
                }
                explosion.isCrit = false;
                result = calculate(mew, vulpix, explosion, field);
                if (gen === 1) {
                    expect(result.range()).toEqual([102, 120]);
                }
                else if (gen === 2) {
                    expect(result.range()).toEqual([149, 176]);
                }
                else if (gen > 2 && gen < 5) {
                    expect(result.range()).toEqual([182, 215]);
                }
                else {
                    expect(result.range()).toEqual([181, 214]);
                }
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Struggle vs. Ghost (gen ".concat(gen, ")"), function () {
                var result = calculate(Pokemon('Mew'), Pokemon('Gengar'), Move('Struggle'));
                if (gen < 2) {
                    expect(result.range()[1]).toBe(0);
                }
                else {
                    expect(result.range()[1]).toBeGreaterThan(0);
                }
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move, Field = _a.Field;
            test("Weather Ball should change type depending on the weather (gen ".concat(gen, ")"), function () {
                var e_2, _a;
                var weathers = [
                    {
                        weather: 'Sun', type: 'Fire', damage: {
                            adv: { range: [346, 408], desc: '(149.7 - 176.6%) -- guaranteed OHKO' },
                            dpp: { range: [170, 204], desc: '(73.5 - 88.3%) -- guaranteed 2HKO' },
                            modern: { range: [344, 408], desc: '(148.9 - 176.6%) -- guaranteed OHKO' }
                        }
                    },
                    {
                        weather: 'Rain', type: 'Water', damage: {
                            adv: { range: [86, 102], desc: '(37.2 - 44.1%) -- guaranteed 3HKO' },
                            dpp: { range: [42, 51], desc: '(18.1 - 22%) -- possible 5HKO' },
                            modern: { range: [86, 102], desc: '(37.2 - 44.1%) -- guaranteed 3HKO' }
                        }
                    },
                    {
                        weather: 'Sand', type: 'Rock', damage: {
                            adv: {
                                range: [96, 114],
                                desc: '(41.5 - 49.3%) -- 20.7% chance to 2HKO after sandstorm damage'
                            },
                            dpp: {
                                range: [39, 46],
                                desc: '(16.8 - 19.9%) -- guaranteed 5HKO after sandstorm damage'
                            },
                            modern: {
                                range: [77, 91],
                                desc: '(33.3 - 39.3%) -- guaranteed 3HKO after sandstorm damage'
                            }
                        }
                    },
                    {
                        weather: 'Hail', type: 'Ice', damage: {
                            adv: {
                                range: [234, 276],
                                desc: '(101.2 - 119.4%) -- guaranteed OHKO'
                            },
                            dpp: {
                                range: [116, 138],
                                desc: '(50.2 - 59.7%) -- guaranteed 2HKO after hail damage'
                            },
                            modern: {
                                range: [230, 272],
                                desc: '(99.5 - 117.7%) -- 93.8% chance to OHKO'
                            }
                        }
                    },
                ];
                try {
                    for (var weathers_1 = __values(weathers), weathers_1_1 = weathers_1.next(); !weathers_1_1.done; weathers_1_1 = weathers_1.next()) {
                        var _b = weathers_1_1.value, weather = _b.weather, type = _b.type, damage = _b.damage;
                        var dmg = gen === 3 ? damage.adv : gen === 4 ? damage.dpp : damage.modern;
                        var _c = __read(gen === 3 && type === 'Rock' ? ['Atk', 'Def'] : ['SpA', 'SpD'], 2), atk = _c[0], def = _c[1];
                        var result = calculate(Pokemon('Castform'), Pokemon('Bulbasaur'), Move('Weather Ball'), Field({ weather: weather }));
                        expect(result.range()).toEqual(dmg.range);
                        expect(result.desc()).toBe("31 ".concat(atk, " Castform Weather Ball (100 BP ").concat(type, ") vs. 31 HP / 31 ").concat(def, " Bulbasaur in ").concat(weather, ": ").concat(dmg.range[0], "-").concat(dmg.range[1], " ").concat(dmg.desc));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (weathers_1_1 && !weathers_1_1.done && (_a = weathers_1["return"])) _a.call(weathers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Thousand Arrows and Ring Target Should negate damage nullfiers (gen ".concat(gen, ")"), function () {
                var result = calculate(Pokemon('Zygarde'), Pokemon('Swellow'), Move('Thousand Arrows'));
                expect(result.range()).toEqual([147, 174]);
                expect(result.desc()).toBe('31 Atk Zygarde Thousand Arrows vs. 31 HP / 31 Def Swellow: 147-174 (56.3 - 66.6%) -- guaranteed 2HKO');
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            var zapdos = Pokemon('Zapdos', { item: 'Iron Ball' });
            if (gen === 4) {
                test("Iron Ball negates ground immunities (gen ".concat(gen, ")"), function () {
                    var result = calculate(Pokemon('Vibrava'), zapdos, Move('Earthquake'));
                    expect(result.range()).toEqual([186, 218]);
                    expect(result.desc()).toBe('31 Atk Vibrava Earthquake vs. 31 HP / 31 Def Zapdos: 186-218 (57.9 - 67.9%) -- guaranteed 2HKO');
                });
            }
            else {
                test("Iron Ball Should negate damage nullifiers (gen ".concat(gen, ")"), function () {
                    var result = calculate(Pokemon('Vibrava'), zapdos, Move('Earthquake'));
                    expect(result.range()).toEqual([93, 109]);
                    expect(result.desc()).toBe('31 Atk Vibrava Earthquake vs. 31 HP / 31 Def Zapdos: 93-109 (28.9 - 33.9%) -- 1.2% chance to 3HKO');
                });
            }
            test("Iron Ball negates levitate (gen ".concat(gen, ")"), function () {
                var result = calculate(Pokemon('Poliwrath'), Pokemon('Mismagius', { item: 'Iron Ball' }), Move('Mud Shot'));
                expect(result.range()).toEqual([29, 35]);
                expect(result.desc()).toBe('31 SpA Poliwrath Mud Shot vs. 31 HP / 31 SpD Mismagius: 29-35 (11.1 - 13.4%) -- possible 8HKO');
            });
        });
        (0, helper_1.inGen)(8, function (_a) {
            var gen = _a.gen, Pokemon = _a.Pokemon;
            test("Pokemon should double their HP stat when dynamaxing (gen ".concat(gen, ")"), function () {
                var munchlax = Pokemon('Munchlax', { isDynamaxed: true });
                expect(munchlax.curHP()).toBe(822);
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move, Field = _a.Field;
            test("Psychic Terrain (gen ".concat(gen, ")"), function () {
                var field = Field({ terrain: 'Psychic' });
                var Mewtwo = Pokemon('Mewtwo', {
                    nature: 'Timid',
                    evs: { spa: 252 },
                    boosts: { spa: 2 }
                });
                var Milotic = Pokemon('Milotic', {
                    item: 'Flame Orb',
                    nature: 'Bold',
                    ability: 'Marvel Scale',
                    evs: { hp: 248, def: 184 },
                    status: 'brn',
                    boosts: { spd: 1 }
                });
                var Psystrike = Move('Psystrike');
                var sPunch = Move('Sucker Punch');
                var result = calculate(Mewtwo, Milotic, Psystrike, field);
                if (gen < 8) {
                    expect(result.range()).toEqual([331, 391]);
                    expect(result.desc()).toBe('+2 31 SpA Mewtwo Psystrike vs. 31 HP / 31+ Def Marvel Scale Milotic in Psychic Terrain: 331-391 (84.2 - 99.4%) -- guaranteed 2HKO after burn damage');
                }
                else {
                    expect(result.range()).toEqual([331, 391]);
                    expect(result.desc()).toBe('+2 31 SpA Mewtwo Psystrike vs. 31 HP / 31+ Def Marvel Scale Milotic in Psychic Terrain: 331-391 (84.2 - 99.4%) -- guaranteed 2HKO after burn damage');
                }
                result = calculate(Mewtwo, Milotic, sPunch, field);
                expect(result.range()).toEqual([0, 0]);
            });
        });
        (0, helper_1.inGens)(8, 8, function (_a) {
            var gen = _a.gen, calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
            test("Parental Bond (gen ".concat(gen, ")"), function () {
                var result = calculate(Pokemon('Kangaskhan-Mega', { evs: { atk: 152 } }), Pokemon('Amoonguss', { nature: 'Bold', evs: { hp: 252, def: 152 } }), Move('Frustration'));
                if (gen === 6) {
                    expect(result.damage).toEqual([
                        [153, 154, 156, 157, 159, 162, 163, 165, 166, 168, 171, 172, 174, 175, 177, 180],
                        [76, 76, 78, 78, 79, 81, 81, 82, 82, 84, 85, 85, 87, 87, 88, 90],
                    ]);
                    expect(result.desc()).toBe('152 Atk Parental Bond Kangaskhan-Mega Frustration vs. 252 HP / 152+ Def Amoonguss: 229-270 (53 - 62.5%) -- approx. 2HKO');
                }
                else {
                    expect(result.damage).toEqual([
                        [153, 154, 156, 157, 159, 162, 163, 165, 166, 168, 171, 172, 174, 175, 177, 180],
                        [37, 37, 39, 39, 39, 40, 40, 40, 40, 42, 42, 42, 43, 43, 43, 45],
                    ]);
                    expect(result.desc()).toBe('31 Atk Parental Bond Kangaskhan-Mega Frustration vs. 31 HP / 31+ Def Amoonguss: 190-225 (43.9 - 52%) -- approx. 6.6% chance to 2HKO');
                }
                result = calculate(Pokemon('Kangaskhan-Mega', { level: 88 }), Pokemon('Amoonguss'), Move('Seismic Toss'));
                expect(result.damage).toEqual([88, 88]);
                expect(result.desc()).toBe('Lvl 88 Parental Bond Kangaskhan-Mega Seismic Toss vs. 31 HP Amoonguss: 176-176 (47.6 - 47.6%) -- guaranteed 3HKO');
                result = calculate(Pokemon('Kangaskhan-Mega', { evs: { atk: 252 } }), Pokemon('Aggron', { level: 72 }), Move('Power-Up Punch'));
                if (gen === 6) {
                    expect(result.desc()).toBe('252 Atk Parental Bond Kangaskhan-Mega Power-Up Punch vs. Lvl 72 0 HP / 0 Def Aggron: 248-296 (120.9 - 144.3%) -- guaranteed OHKO');
                }
                else {
                    expect(result.desc()).toBe('31 Atk Parental Bond Kangaskhan-Mega Power-Up Punch vs. Lvl 72 31 HP / 31 Def Aggron: 196-236 (95.6 - 115.1%) -- 78.9% chance to OHKO');
                }
                if (gen === 6)
                    return;
                result = calculate(Pokemon('Kangaskhan-Mega', { evs: { atk: 252 } }), Pokemon('Lunala'), Move('Crunch'));
                expect(result.damage).toEqual([
                    [188, 190, 192, 194, 196, 198, 202, 204, 206, 208, 210, 212, 214, 216, 218, 222],
                    [92, 96, 96, 96, 96, 100, 100, 100, 104, 104, 104, 104, 108, 108, 108, 112],
                ]);
                expect(result.desc()).toBe('31 Atk Parental Bond Kangaskhan-Mega Crunch vs. 31 HP / 31 Def Shadow Shield Lunala: 280-334 (67.4 - 80.4%) -- approx. 2HKO');
            });
        });
    });
    describe('Gen 8', function () {
        (0, helper_1.inGen)(8, function (_a) {
            var calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move, Field = _a.Field;
            test('Basic: Gengar vs. Chansey', function () {
                var result = calculate(Pokemon('Gengar', {
                    item: 'Life Orb',
                    nature: 'Modest',
                    evs: { spa: 252 },
                    boosts: { spa: 3 }
                }), Pokemon('Chansey', {
                    item: 'Eviolite',
                    nature: 'Bold',
                    evs: { hp: 100, spd: 100 },
                    boosts: { spd: 1 }
                }), Move('Sludge Bomb'));
                expect(result.range()).toEqual([204, 242]);
                expect(result.desc()).toBe('+3 31+ SpA Life Orb Gengar Sludge Bomb vs. +1 31 HP / 31 SpD Eviolite Chansey: 204-242 (30.6 - 36.3%) -- 52.9% chance to 3HKO');
            });
            test('Knock Off vs. Silvally', function () {
                var sawk = Pokemon('Sawk', { ability: 'Mold Breaker', evs: { atk: 252 } });
                var silvally = Pokemon('Silvally-Dark', { item: 'Dark Memory' });
                var knockoff = Move('Knock Off');
                var result = calculate(sawk, silvally, knockoff);
                expect(result.desc()).toBe('31 Atk Mold Breaker Sawk Knock Off vs. 31 HP / 31 Def Silvally-Dark: 36-43 (10.8 - 12.9%) -- possible 8HKO');
            });
            test('-ate Abilities', function () {
                var sylveon = Pokemon('Sylveon', { ability: 'Pixilate', evs: { spa: 252 } });
                var silvally = Pokemon('Silvally');
                var hypervoice = Move('Hyper Voice');
                var result = calculate(sylveon, silvally, hypervoice);
                expect(result.desc()).toBe('31 SpA Pixilate Sylveon Hyper Voice vs. 31 HP / 31 SpD Silvally: 165-195 (49.8 - 58.9%) -- 99.6% chance to 2HKO');
            });
            test('% chance to OHKO', function () {
                var abomasnow = Pokemon('Abomasnow', {
                    level: 55,
                    item: 'Choice Specs',
                    evs: { spa: 252 }
                });
                var deerling = Pokemon('Deerling', { evs: { hp: 36 } });
                var blizzard = Move('Blizzard');
                var hail = Field({ weather: 'Hail' });
                var result = calculate(abomasnow, deerling, blizzard, hail);
                expect(result.desc()).toBe('Lvl 55 31 SpA Choice Specs Abomasnow Blizzard vs. 31 HP / 31 SpD Deerling: 236-278 (87.4 - 102.9%) -- 25% chance to OHKO');
            });
            test('% chance to OHKO with Leftovers', function () {
                var kyurem = Pokemon('Kyurem', {
                    level: 100,
                    item: 'Choice Specs',
                    evs: { spa: 252 }
                });
                var jirachi = Pokemon('Jirachi', { item: 'Leftovers' });
                var earthpower = Move('Earth Power');
                var result = calculate(kyurem, jirachi, earthpower);
                expect(result.desc()).toBe('31 SpA Choice Specs Kyurem Earth Power vs. 31 HP / 31 SpD Jirachi: 294-348 (86.2 - 102%) -- 12.5% chance to OHKO');
            });
            test('Technician with Low Kick', function () {
                var ambipom = Pokemon('Ambipom', { level: 50, ability: 'Technician' });
                var blissey = Pokemon('Blissey', { level: 50, evs: { hp: 252 } });
                var result = calculate(ambipom, blissey, Move('Low Kick'));
                expect(result.range()).toEqual([272, 320]);
                expect(result.desc()).toBe('31 Atk Technician Ambipom Low Kick (60 BP) vs. 31 HP / 31 Def Blissey: 272-320 (75.1 - 88.3%) -- guaranteed 2HKO');
                var aggron = Pokemon('Aggron', { level: 50, evs: { hp: 252 } });
                result = calculate(ambipom, aggron, Move('Low Kick'));
                expect(result.range()).toEqual([112, 132]);
                expect(result.desc()).toBe('31 Atk Ambipom Low Kick (120 BP) vs. 31 HP / 31 Def Aggron: 112-132 (63.2 - 74.5%) -- guaranteed 2HKO');
            });
        });
        describe('Gen 9', function () {
            (0, helper_1.inGen)(9, function (_a) {
                var calculate = _a.calculate, Pokemon = _a.Pokemon, Move = _a.Move;
                test('Supreme Overlord', function () {
                    var kingambit = Pokemon('Kingambit', { level: 100, ability: 'Supreme Overlord', alliesFainted: 0 });
                    var aggron = Pokemon('Aggron', { level: 100 });
                    var result = calculate(kingambit, aggron, Move('Iron Head'));
                    expect(result.range()).toEqual([67, 79]);
                    expect(result.desc()).toBe('31 Atk Kingambit Iron Head vs. 31 HP / 31 Def Aggron: 67-79 (23.8 - 28.1%) -- 91.2% chance to 4HKO');
                    kingambit.alliesFainted = 5;
                    result = calculate(kingambit, aggron, Move('Iron Head'));
                    expect(result.range()).toEqual([100, 118]);
                    expect(result.desc()).toBe('31 Atk Supreme Overlord 5 allies fainted Kingambit Iron Head vs. 31 HP / 31 Def Aggron: 100-118 (35.5 - 41.9%) -- guaranteed 3HKO');
                    kingambit.alliesFainted = 10;
                    result = calculate(kingambit, aggron, Move('Iron Head'));
                    expect(result.range()).toEqual([100, 118]);
                    expect(result.desc()).toBe('31 Atk Supreme Overlord 5 allies fainted Kingambit Iron Head vs. 31 HP / 31 Def Aggron: 100-118 (35.5 - 41.9%) -- guaranteed 3HKO');
                });
            });
        });
    });
});
//# sourceMappingURL=calc.test.js.map