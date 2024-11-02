"use strict";
exports.__esModule = true;
var adaptable_1 = require("../adaptable");
var dex_1 = require("@pkmn/dex");
var gen_1 = require("./gen");
var pkmn = { Generations: new gen_1.Generations(dex_1.Dex) };
var gens = [1, 2, 3, 4, 5, 6, 7, 8, 9];
describe('Adaptable', function () {
    test('usage', function () {
        var gen = pkmn.Generations.get(5);
        var result = (0, adaptable_1.calculate)(gen, new adaptable_1.Pokemon(gen, 'Gengar', {
            item: 'Choice Specs',
            nature: 'Timid',
            evs: { spa: 252 },
            boosts: { spa: 1 }
        }), new adaptable_1.Pokemon(gen, 'Chansey', {
            item: 'Eviolite',
            nature: 'Calm',
            evs: { hp: 252, spd: 252 }
        }), new adaptable_1.Move(gen, 'Focus Blast'));
        expect(result.range()).toEqual([274, 324]);
    });
});
//# sourceMappingURL=data.test.js.map