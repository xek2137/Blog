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

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author',
        optTagsListSelector = '.tags.list',
        optCloudClassCount = 5,
        optCloudClassPrefix = 'tag-size-',
        optAuthorListSelector = '.authors.list';
    
    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }
        clickedElement.classList.add('active');
        const activeArticles = document.querySelectorAll(optArticleSelector);

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }
        const articleSelector = clickedElement.getAttribute('href');
        const targetArticle = document.querySelector(articleSelector);
        targetArticle.classList.add('active');
    };

    const generateTitleLinks = function (customSelector = '') {
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';
        let html = '';
        const articles = document.querySelectorAll(optArticleSelector + customSelector);

        for (let article of articles) {
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            const linkHTMLData = {id: articleId, title: articleTitle};
            const linkHTML = templates.articleLink(linkHTMLData);
            titleList.insertAdjacentHTML('beforeend', linkHTML);
            html = html + linkHTML;
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    };
    generateTitleLinks();

    const calculateTagsParams = function (tags) {
        const params = {
            max: 0,
            min: 999999,
        };

        for (let tag in tags) {
            params.max = Math.max(tags[tag], params.max);
            params.min = Math.min(tags[tag], params.min);
        }
        return params;
    };

    const calculateTagClass = function (count, params) {
        const normalizedCount = count - params.min;
        const normalizedMax = params.max - params.min;
        const percentage = normalizedCount / normalizedMax;
        const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

        return optCloudClassPrefix + classNumber;
    };

    const generateTags = function () {
        let allTags = {};
        const articles = document.querySelectorAll(optArticleSelector);

        for (let article of articles) {
            const wrapperTags = article.querySelector(optArticleTagsSelector);
            let html = '';
            const articleTags = article.getAttribute('data-tags');
            const articleTagsArray = articleTags.split(' ');

            for (let tag of articleTagsArray) {
                const linkHTMLData = {tag: tag};
                const linkHTML = templates.tagLink(linkHTMLData);
                html = html + linkHTML;
                if(!allTags[tag]) {

                    allTags[tag] = 1;
                }
                else {
                    allTags[tag]++;
                }
            }
            wrapperTags.innerHTML = html;
        }
        const tagList = document.querySelector(optTagsListSelector);
        const tagsParams = calculateTagsParams(allTags);
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
        const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

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
        const linkTags = document.querySelectorAll('a[href^="#tag-"]');

        for (let linkTag of linkTags) {
            linkTag.addEventListener('click', tagClickHandler);
        }
    };
    addClickListenersToTags();

    const calculateAuthorsParams = function (authors) {
        const params = {
            max: 0,
            min: 999999,
        };

        for (let tag in authors) {
            params.max = Math.max(authors[tag], params.max);
            params.min = Math.min(authors[tag], params.min);
        }
        return params;
    };

    const generateAuthors = function () {
        let allAuthors = {};
        const articles = document.querySelectorAll(optArticleSelector);

        for (let article of articles) {
            const wrapperAuthors = article.querySelector(optArticleAuthorSelector);
            let html =' ';
            const tag = article.getAttribute('data-author');
            const linkHTMLData = {tag: tag};
            const linkHTML = templates.authorLink(linkHTMLData);
            html = html + linkHTML;
            if (!allAuthors[tag]) {
                allAuthors[tag] = 1;
            }
            else {
                allAuthors[tag]++;
            }
            wrapperAuthors.innerHTML = html;
        }
        const authorList = document.querySelector(optAuthorListSelector);
        const authorParams = calculateAuthorsParams(allAuthors);
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
        const activeAuthors = document.querySelectorAll('a.active[href^="#tag-author-"]');

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
        const linkAuthors = document.querySelectorAll('a[href^="#tag-author-"]');

        for (let linkAuthor of linkAuthors) {
            linkAuthor.addEventListener('click', authorClickHandler);
        }
    };
    addClickListenersToAuthors();
}
