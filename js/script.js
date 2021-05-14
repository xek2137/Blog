/* eslint-disable no-unused-vars */
{
    'use strict';

    const templates = {
        articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
        tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
        authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
        tagCloudLink: Handlebars.compile(document.querySelector('#template-tagCloud-link').innerHTML),
        authorCloudLink: Handlebars.compile(document.querySelector('#template-authorCloud-link').innerHTML),
    };

    const opt = {
        ArticleSelector: '.post',
        TitleSelector: '.post-title',
        TitleListSelector: '.titles',
        ArticleTagsSelector: '.post-tags .list',
        ArticleAuthorSelector: '.post-author',
        TagsListSelector: '.tags.list',
        CloudClassCount: 5,
        CloudClassPrefix: 'tag-size-',
        AuthorListSelector: '.authors.list',
        TagActive: 'a.active[href^="#tag-"]',
        TagLink: 'a[href^="#tag-"]',
        AuthorActive: 'a.active[href^="#tag-author-"]',
        AuthorLink: 'a[href^="#tag-author-"]'
    };
    
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        clickedElement.classList.add('active');
        const activeArticles = document.querySelectorAll(opt.ArticleSelector);

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        const articleSelector = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(articleSelector);
        targetArticle.classList.add('active');
    };

    const generateTitleLinks = function (customSelector = '') {
        const titleList = document.querySelector(opt.TitleListSelector);
        titleList.innerHTML = '';
        let html = '';
        const articles = document.querySelectorAll(opt.ArticleSelector + customSelector);

        for (let article of articles) {
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(opt.TitleSelector).innerHTML;
            const linkHTMLData = {id: articleId, title: articleTitle};
            html += templates.articleLink(linkHTMLData);
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    };
    generateTitleLinks();

    const calculateParams = function (tags, authors) {
        const params = {
            max: 0,
            min: 999999,
        };

        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        for (let tag in authors) {
            params.max = Math.max(authors[tag], params.max);
            params.min = Math.min(authors[tag], params.min);
        }
        return params;
    };

    const calculateTagClass = function (count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (opt.CloudClassCount - 1) + 1);

        return opt.CloudClassPrefix + classNumber;
    };

    const generateTags = function () {
        let allTags = {};
        const articles = document.querySelectorAll(opt.ArticleSelector);

        for (let article of articles) {
            const wrapperTags = article.querySelector(opt.ArticleTagsSelector);
            let html = '';
            const articleTags = article.getAttribute('data-tags');
            const articleTagsArray = articleTags.split(' ');

            for (let tag of articleTagsArray) {
                const linkHTMLData = {tag: tag};
                html += templates.tagLink(linkHTMLData);
                if(!allTags[tag]) {

                    allTags[tag] = 1;
                }
                else {
                    allTags[tag]++;
                }
            }
            wrapperTags.innerHTML = html;
        }
        const tagList = document.querySelector(opt.TagsListSelector);
        const tagsParams = calculateParams(allTags);
        const allTagsData = {tags: []};
        
        for (let tag in allTags) {
            allTagsData.tags.push ({
                tag: tag,
                count: allTags[tag],
                className: calculateTagClass(allTags[tag], tagsParams)
            });
        }
        tagList.innerHTML = templates.tagCloudLink(allTagsData);
    };
    generateTags();

    const tagClickHandler = function (event) {
        event.preventDefault();

        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const tag = href.replace('#tag-', '');
        const activeTags = document.querySelectorAll(opt.TagActivator);

        for (let activeTag of activeTags) {
            activeTag.classList.remove('active');
        }
        const findTagLinks = document.querySelectorAll('a[href="' + href + '"]');

        for (let findTagLink of findTagLinks) {
            findTagLink.classList.add('active');
        }
        generateTitleLinks('[data-tags~="' + tag + '"]');
    };

    const addClickListenersToTags = function () {
        const linkTags = document.querySelectorAll(opt.TagLink);

        for (let linkTag of linkTags) {
            linkTag.addEventListener('click', tagClickHandler);
        }
    };
    addClickListenersToTags();

    const generateAuthors = function () {
        let allAuthors = {};
        const articles = document.querySelectorAll(opt.ArticleSelector);

        for (let article of articles) {
            const wrapperAuthors = article.querySelector(opt.ArticleAuthorSelector);
            let html ='';
            const tag = article.getAttribute('data-author');
            const linkHTMLData = {tag: tag};
            html += templates.authorLink(linkHTMLData);
            if (!allAuthors[tag]) {
                allAuthors[tag] = 1;
            }
            else {
                allAuthors[tag]++;
            }
            wrapperAuthors.innerHTML = html;
        }
        const authorList = document.querySelector(opt.AuthorListSelector);
        const authorParams = calculateParams(allAuthors);
        let allAuthorsData = {tags: []};

        for (let tag in allAuthors) {
            allAuthorsData.tags.push ({
                tag: tag,
                count: allAuthors[tag],
                className: calculateTagClass(allAuthors[tag], authorParams)
            });
        }
        authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    };
    generateAuthors();

    const authorClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        const href = clickedElement.getAttribute('href');
        const tag = href.replace('#tag-author-', '');
        const activeAuthors = document.querySelectorAll(opt.AuthorActive);

        for (let activeAuthor of activeAuthors) {
            activeAuthor.classList.remove('active');
        }
        const findAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

        for (let findAuthorLink of findAuthorLinks) {
            findAuthorLink.classList.add('active');
        }
        generateTitleLinks('[data-author="' + tag + '"]');
    };
   
    const addClickListenersToAuthors = function () {
        const linkAuthors = document.querySelectorAll(opt.AuthorLink);

        for (let linkAuthor of linkAuthors) {
            linkAuthor.addEventListener('click', authorClickHandler);
        }
    };
    addClickListenersToAuthors();
}
