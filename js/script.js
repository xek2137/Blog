{
    'use strict';

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list';
    
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
        const activeArticles = document.querySelectorAll(optArticleSelector);

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href');

        /* find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);

        /* add class 'active' to the correct article */
        targetArticle.classList.add('active');
    };


    const generateTitleLinks = function (customSelector = '') {
        const titleList = document.querySelector(optTitleListSelector);
        
        /* remove contents of titleList */
        titleList.innerHTML = '';
        let html = '';
        
        /* for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        for (let article of articles) {

            /* get the article id */
            const articleId = article.getAttribute('id');

            /* find the title element */
            /* get the title from the title element */
            const articleTitle = article.querySelector(optTitleSelector).innerHTML;

            /* create HTML of the link */
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

            /* insert link into titleList */
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

        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        
        /* START LOOP: for every article: */
        for (let article of articles) {
            
            /* find tags wrapper */
            const wrapperTags = article.querySelector(optArticleTagsSelector);

            /* make html variable with empty string */
            let html = '';

            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');

            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');

            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {

                /* generate HTML of the link */
                const linkHTML = '<li><a href="#' + tag + '"><span>' + tag + '</span></a></li>';

                /* add generated code to html variable */
                wrapperTags.insertAdjacentHTML('beforeend', linkHTML);
                html = html + linkHTML;
            /* END LOOP: for each tag */
            }
            /* insert HTML of all the links into the tags wrapper */
            wrapperTags.innerHTML = html;
        /* END LOOP: for every article: */
        }
    };

    generateTags();

    const tagClickHandler = function (event) {
        console.log(tagClickHandler);
        /* prevent default action for this event */
        event.preventDefault();

        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;

        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');

        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');

        /* find all tag links with class active */
        const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

        /* START LOOP: for each active tag link */
        for (let activeTag of activeTags) {
        /* remove class active */
            activeTag.classList.remove('active');
        /* END LOOP: for each active tag link */
        }

        /* find all tag links with "href" attribute equal to the "href" constant */
        const findTagLinks = document.querySelectorAll('a[href="' + href + '"]');
        console.log(findTagLinks);
        /* START LOOP: for each found tag link */
        for (let findTagLink of findTagLinks) {
        /* add class active */
            findTagLink.classList.add('active');
        /* END LOOP: for each found tag link */
        }

        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    };

    const addClickListenersToTags = function () {
        /* find all links to tags */
        const linkTags = document.querySelectorAll('a[href^="#tag-"]');
        
        /* START LOOP: for each link */
        for (let linkTag of linkTags) {
        /* add tagClickHandler as event listener for that link */
            linkTag.addEventListener('click', tagClickHandler);
        /* END LOOP: for each link */
        }
    };
    addClickListenersToTags();
}
