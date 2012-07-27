/**
 * Simple Pac Hack demo Showing the use of The dynaic-map and value-tile plugins
 * for Impact
 * Note: Graphical resources can be found at www.spritesheet.net (free for personal use).
 * User: Stuart Tresadern
 * Date: 09.07.12
 * Time: 22:00
 * Version 1.0.1.
 */
ig.module(
    'game.main'
)
    .requires(
    'impact.game',
    'game.entities.player',
    'impact.debug.debug',
    'plugins.value-map',
    'plugins.dynamic-map',
    'game.levels.level1'
)
    .defines(function () {

        MyGame = ig.Game.extend({

            player:null,
            pillMap:null,
            aiMap:null,
            pills:null,
            pillTiles:new ig.Image('media/pills.png'),
            updatePills:false,

            init:function () {

                // hide map layers (prevent draw in game)
                ig.BackgroundMap.inject(
                    {
                        visible:true,

                        draw:function () {
                            "use strict";
                            if (!this.visible) return;

                            this.parent();

                        }
                    }
                );

                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

                this.loadLevel(LevelLevel1);
                this.player = this.getEntitiesByType(EntityPlayer)[0];

            },
            loadLevel:function (level) {

                this.parent(ig.copy(level));

                var pm = ig.game.getMapByName('pillmap');
                pm.visible = false;
                this.pillMap = new ig.ValueMap(pm.tilesize, pm.data, false);
                this.pillMap.removeCollision = false;

                var aim = ig.game.getMapByName('aimap');
                aim.visible = false;
                this.aiMap = new ig.ValueMap(aim.tilesize, aim.data, false);
                this.aiMap.removeCollision = false;

                this.createPills();

            },

            createPills:function () {

                // creates the pills layer as a new dynamic layer from the pillMap data

                this.pills = new DynamicMap(this.pillTiles, 8, 30, 38, 0, 0);

                for (var y = 0; y < this.pillMap.data.length; ++y) {
                    var row = this.pillMap.data[y];
                    for (var x = 0; x < row.length; ++x) {

                        if (this.pillMap.data[y][x] > 0) {
                            this.pills.Map.data[y][x] = (this.pillMap.data[y][x]) - 1;

                        }
                    }
                }

                this.updatePills = true;

            },

            draw:function () {

                this.parent();
                this.pills.draw(this.updatePills);

                this.player.draw(true);
                this.updatePills = false;

            }

        });

        ig.main('#canvas', MyGame, 60, 240, 288, 2);

    });
