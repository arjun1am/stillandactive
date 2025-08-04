module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("assets");
  
  // Fix image paths automatically
  eleventyConfig.addTransform("fix-image-paths", function(content) {
    if (this.outputPath && this.outputPath.endsWith(".html")) {
      // Add leading slash to assets/images paths
      content = content.replace(/src="assets\//g, 'src="/assets/');
    }
    return content;
  });
  
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: "./",
      output: "_site",
      data: "_data"
    },
    templateFormats: ["md", "njk"]
  };
};