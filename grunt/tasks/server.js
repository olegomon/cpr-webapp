'use strict';
module.exports = function (grunt) {

    var path = require('path');
    var connect = require(path.join(process.cwd(), 'node_modules/grunt-contrib-connect/node_modules/connect'));

    function normalizeResources(resources) {
        return resources.map(function (resource) {
            if (typeof resource === 'string') {
                return { path: resource, context: '/' };
            }
            if (!resource.hasOwnProperty('context')) {
                resource.context = '/';
            }
            return resource;
        });
    }

    grunt.registerMultiTask('server', 'Creates configuration for the grunt-contrib-connect grunt task and runs it', function () {

        var task = this;
        var options = task.options({
            // custom server options
            middleware: [],
            resources : []
        });

        var middleware = options.middleware;

        if (options.ca) {
            options.ca = grunt.file.read(options.ca);
        }
        if (options.key) {
            options.key = grunt.file.read(options.key);
        }
        if (options.cert) {
            options.cert = grunt.file.read(options.cert);
        }

        // add connect static middleware for serving static resource files
        var resources = options.resources;
        if (resources) {
            resources = normalizeResources(resources);
            resources.forEach(function (resource) {
                grunt.verbose.writeln('Using resource path: ' + JSON.stringify(resource));
                // make this path available under the given context
                middleware.push(connect().use(resource.context, connect.static(resource.path, resource.options || {})));
                grunt.log.write('Serving resources from: %s => %s ...', resource.path, resource.context).ok();
            })
        } else {
            grunt.log.error('No resource definitions found');
        }

        // if this task was started with the keepalive flag,
        // then pass it to the plugin
        options.keepalive = this.flags.keepalive || options.keepalive;

        // cleanup invalid grunt-contrib-connect options
        delete options.resources;

        var config = {
            // default options for the connect task
            options: options
        };
        config[task.target] = { /* empty target to execute */ };

        // set the created configuration
        grunt.config.set('connect.' + task.target, config);

        // run the configured task
        grunt.task.run('connect:' + task.target);
    });
};
