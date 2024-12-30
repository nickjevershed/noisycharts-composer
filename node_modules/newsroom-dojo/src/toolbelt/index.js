/**
 * Fetches JSON data from a given URL.
 *
 * @param {string} url - The URL to fetch the JSON data from.
 * @returns {Promise<Object>} - A promise that resolves to the JSON data.
 */
export function getJson(url) {
  return fetch(url)
    .then(response => response.json());
}

/**
 * Retrieves the value of a URL parameter by name.
 *
 * @param {string} paramName - The name of the URL parameter to retrieve.
 * @returns {string|null} - The value of the URL parameter, or null if not found.
 */
export function getURLParams(paramName) {
  let params;
  if (top !== self) {
    params = window.location.search.substring(1).split("&");
  } else {
    params = window.parent.location.search.substring(1).split("&");
  }

  for (let i = 0; i < params.length; i++) {
    const [key, value] = params[i].split("=");
    if (key === paramName) {
      return value;
    }
  }
  return null;
}

/**
 * Renders a Mustache template with the given context.
 *
 * @param {string} template - The Mustache template to render.
 * @param {Object|Array} self - The context or array of contexts to render the template with.
 * @param {Object} parent - The parent context, if any.
 * @param {boolean} invert - A flag indicating whether to invert the context.
 * @returns {string} - The rendered template.
 *
 * Example usage:
 *
 * const template = `
 *   var is {{var}}
 *   zero value is {{zerovar}}
 *   undefined var is {{undefinedvar}}
 *   nested object is
 *   {{#obj}}
 *     {{#goes}}
 *     {{deep}}
 *     {{/goes}}
 *   {{/obj}}
 *   dot syntax is {{obj.goes.deep}}
 *   dot syntax in section is {{#obj.goes}}{{deep}}{{/obj.goes}}
 *   list is 
 *   {{#list}}
 *     {{item}}
 *   {{/list}}
 *   inverted is
 *   {{^inverted}}
 *     okay
 *   {{/inverted}}
 *   dot is
 *   {{#dot}}
 *     {{.}}
 *   {{/dot}}
 *   lambda is
 *   {{#lambda}}
 *     {{{raw}}}
 *   {{/lambda}}
 *   raw is {{{raw}}}
 *   raw2 is {{&raw}}
 *   comment is {{!not}} okay
 *   partial is {{>partial}}
 * `;
 *
 * const ctx = {
 *   var: "<okay>",
 *   obj: {goes: {deep: "okay"}},
 *   list:[{item:"okay"},{item:"okay2"}],
 *   dot: ["okay"],
 *   raw: "<okay>",
 *   inverted: false,
 *   lambda: function (text, render) {
 *     return "<b>" + render(text + this.dot[0]) + "</b>";
 *   },
 *   partial: "{{{var}}}",
 *   zerovar: 0
 * };
 *
 * const output = mustache(template, ctx);
 */
export function mustache(template, self, parent, invert) {
    var render = mustache;
    var output = "";
    var i;

    /**
     * Retrieves a value from the context using a dot-separated path.
     *
     * @param {Object} ctx - The context to retrieve the value from.
     * @param {string|Array} path - The dot-separated path or array of path segments.
     * @returns {*} - The retrieved value.
     */
    function get(ctx, path) {
        path = path.pop ? path : path.split(".");
        ctx = ctx[path.shift()];
        ctx = ctx != null ? ctx : "";
        return (0 in path) ? get(ctx, path) : ctx;
    }

    // Ensure self is an array
    self = Array.isArray(self) ? self : (self ? [self] : []);

    // Handle inverted sections
    self = invert ? (0 in self) ? [] : [1] : self;

    // Iterate over each context in self
    for (i = 0; i < self.length; i++) {
        var childCode = '';
        var depth = 0;
        var inverted;
        var ctx = (typeof self[i] == "object") ? self[i] : {};

        // Merge parent context with current context
        ctx = Object.assign({}, parent, ctx);

        // Set current context value
        ctx[""] = {"": self[i]};

        // Replace template tags with context values
        template.replace(/([\s\S]*?)({{((\/)|(\^)|#)(.*?)}}|$)/g,
            function(match, code, y, z, close, invert, name) {
                if (!depth) {
                    output += code.replace(/{{{(.*?)}}}|{{(!?)(&?)(>?)(.*?)}}/g,
                        function(match, raw, comment, isRaw, partial, name) {
                            return raw ? get(ctx, raw)
                                : isRaw ? get(ctx, name)
                                : partial ? render(get(ctx, name), ctx)
                                : !comment ? new Option(get(ctx, name)).innerHTML
                                : "";
                        }
                    );
                    inverted = invert;
                } else {
                    childCode += depth && !close || depth > 1 ? match : code;
                }
                if (close) {
                    if (!--depth) {
                        name = get(ctx, name);
                        if (/^f/.test(typeof name)) {
                            output += name.call(ctx, childCode, function(template) {
                                return render(template, ctx);
                            });
                        } else {
                            output += render(childCode, name, ctx, inverted);
                        }
                        childCode = "";
                    }
                } else {
                    ++depth;
                }
            }
        );
    }
    return output;
}