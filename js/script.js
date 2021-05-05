/* eslint-disable no-unused-vars */
{
    'use strict';

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleAuthorSelector = '.post-author';
    
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
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
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

    const generateTags = function () {

        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
 
            const wrapperTags = article.querySelector(optArticleTagsSelector);
            let html = '';
            const articleTags = article.getAttribute('data-tags');
            const articleTagsArray = articleTags.split(' ');
            for (let tag of articleTagsArray) {

                const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
                html = html + linkHTML;
            }
            wrapperTags.innerHTML = html;
        }
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

    const generateAuthors = function () {
        
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {

            const wrapperAuthors = article.querySelector(optArticleAuthorSelector);
            let html =' ';
            const tag = article.getAttribute('data-author');
            const linkHTML = '<li><a href="#tag-author-' + tag + '"><span>' + tag + '</span></a></li>';
            html = html + linkHTML;
            wrapperAuthors.innerHTML = html;
        }
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
