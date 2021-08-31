'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const axios = require('axios')

module.exports = {
    import: async ctx => {
      const { data } = await axios.get('https://www.cwowd.com/wp-json/wp/v2/posts?per_page=3');
      const posts = await Promise.all(data.map(post => new Promise(async (resolve, reject) => {
        const { title: { rendered: titleRendered }, slug, content: { rendered: contentRendered }, date, featured_image } = post;
        try{
            // featured_image functionality here that we built
            // out with our helper functions
            const downloaded = await strapi.config.functions.download(featured_image);
            const [{ id: fileId }] = await strapi.config.functions.upload(downloaded);
              
            // now that we have fileId we can complete our postData object
            const postData = {
                title: titleRendered,
                content: contentRendered,
                slug,
                image: [fileId],
                createdAt: date
            };
            // use the strapi services create function to create entry
            const created = await strapi.services.post.create(postData);
            resolve(created)
          }catch(err){
            reject(err)
          }
        })));

        ctx.send(posts);
  }
};
