{
    'use strict';

    const titleClickHandler = function (event) {
        event.preventDefault();
        const clickedElement = this;

        /* remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* add class 'active' to the clicked link */
        clickedElement.classList.add('active');

        /* remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    
    const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';
    
    const generateTitleLinks = function () {
        const titleList = document.querySelector(optTitleListSelector);
        
        /* remove contents of titleList */
        titleList.innerHTML = '';
        let html = '';
        
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        
        for (let article of articles) {
            
            /* get the article id */
            const articleId = article.getAttribute('id');
            
            /* find the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            
            /* get the title from the title element */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            
            /* create HTML of the link */
            /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/ //O CO TU DOKLADNIE CHODZI?
            titleList.insertAdjacentHTML('beforeend', linkHTML);
            
            /* insert link into titleList */
            html = html + linkHTML;
        }
        
        titleList.innerHTML = html;

        const links = document.querySelectorAll('.titles a');
        
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    
    generateTitleLinks();
}