"use strict";

const marked = require("marked");
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    const options = loaderUtils.getOptions(this);

    this.cacheable();

    marked.setOptions(options);

    if (options) {
        const { decodeImgSrc, decodeAHref } = options

        let pattern 

        if (decodeImgSrc && decodeAHref) {
            pattern = /<[img|a].*?[src|href]="(.*?)".*?\/?>/ig
        } else if (decodeImgSrc) {
            pattern = /<img.+src=\"?(.+)\"?.+>/ig
        } else if (decodeAHref) {
            pattern = /<a.+href=\"?([^"']+)\"?.+>/ig
        }

        const result = marked(markdown).replace(pattern, function (match, capture) {
            return decodeURI(match)
        }) 

        return result
    }

    return marked(markdown)
};
