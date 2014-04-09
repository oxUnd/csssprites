/**
 * fis.baidu.com
 */

'use strict';

var fis = module.exports = require('fis');

fis.cli.name = "csssprites";
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

fis.config.set('settings.optimizer.png-compressor.type', 'pngquant');
fis.config.set('modules.postpackager', [function(ret, conf, settings, opt) {
    fis.util.map(ret.ids, function (id, file) {
        var content = file.getContent();
        file.setContent(content.replace(/url\s*\(\s*("(?:[^\\"\r\n\f]|\\[\s\S])*"|'(?:[^\\'\n\r\f]|\\[\s\S])*'|[^)}]+)\s*\)/ig, function(m, $1) {
            if (/_(x|y|z)\.png$/.test($1)) {
                m = 'url(.' + $1 + ')';
            }
            return m;
        }));
    });
}]);

fis.config.set('roadmap.path', [
    {
        reg : 'map.json',
        release : false
    },
    {
        reg : '**.css',
        useSprite: true,
        useStandard : true
    }, {
        reg: '**',
        useStandard: false
    }
]);

Object.defineProperty(global, 'csssprites', {
    enumerable : true,
    writable : false,
    value : fis
});
