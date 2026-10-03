/* ==================================================
   SOUND
================================================== */

const soundButton =
    document.getElementById(
        "soundButton"
    );

const bgm =
    document.getElementById(
        "bgm"
    );


let playing = false;


soundButton.addEventListener(
    "click",
    async () => {

        if (playing) {

            bgm.pause();

            soundButton.innerHTML =
                'SOUND <span>○</span>';

            playing = false;

        } else {

            try {

                await bgm.play();

                soundButton.innerHTML =
                    'SOUND <span>●</span>';

                playing = true;

            } catch (error) {

                console.log(
                    "Audio could not be played:",
                    error
                );

            }

        }

    }
);



/* ==================================================
   ELEMENTS
================================================== */


/* HERO */

const visual =
    document.querySelector(
        ".visual"
    );


/* CONCEPT */

const statements =
    document.querySelectorAll(
        ".concept-statement p"
    );


const conceptJapanese =
    document.querySelector(
        ".concept-japanese"
    );


/* MISSION */

const mission =
    document.querySelector(
        ".mission"
    );


const missionContent =
    document.querySelector(
        ".mission-content"
    );


/* KEYWORDS */

const keywordsSection =
    document.querySelector(
        ".keywords"
    );


const keywords =
    document.querySelectorAll(
        ".keyword"
    );


/* VISION */

const visionSection =
    document.querySelector(
        ".vision"
    );


const visionWords = {

    dance:
        document.querySelector(
            ".word-dance"
        ),

    music:
        document.querySelector(
            ".word-music"
        ),

    art:
        document.querySelector(
            ".word-art"
        ),

    people:
        document.querySelector(
            ".word-people"
        )

};


const visionLines =
    document.querySelectorAll(
        ".vision-line"
    );


const visionDescription =
    document.querySelector(
        ".vision-description"
    );


/* PHILOSOPHY */

const philosophySection =
    document.querySelector(
        ".philosophy"
    );


const philosophyText =
    document.querySelector(
        ".philosophy-text"
    );


const philosophyJapanese =
    document.querySelector(
        ".philosophy-japanese"
    );


const philosophyFinal =
    document.querySelector(
        ".philosophy-final"
    );



/* ==================================================
   HELPER
================================================== */


/*
   0 ～ 1
*/

function clamp(
    value,
    min = 0,
    max = 1
) {

    return Math.max(
        min,
        Math.min(
            value,
            max
        )
    );

}


/*
   section自己的滚动进度

   0 = 刚进入
   1 = 即将离开
*/

function getSectionProgress(
    section
) {

    const rect =
        section.getBoundingClientRect();


    const scrollableDistance =
        section.offsetHeight -
        window.innerHeight;


    if (
        scrollableDistance <= 0
    ) {

        return 0;

    }


    return clamp(
        -rect.top /
        scrollableDistance
    );

}


/*
   区间进度

   例如：

   0.2 → 0
   0.5 → 1
*/

function rangeProgress(
    progress,
    start,
    end
) {

    return clamp(
        (
            progress -
            start
        ) /
        (
            end -
            start
        )
    );

}



/* ==================================================
   MAIN UPDATE
================================================== */

function updatePage() {


    const scrollY =
        window.scrollY;


    const screenHeight =
        window.innerHeight;



    /* ==================================================
       01 / HERO
    ================================================== */

    const heroProgress =
        clamp(
            scrollY /
            screenHeight
        );


    const videoScale =
        1 -
        heroProgress * 0.35;


    const videoMoveUp =
        heroProgress * 120;


    visual.style.transform = `
        translate(
            -50%,
            calc(
                -50% -
                ${videoMoveUp}px
            )
        )
        scale(
            ${videoScale}
        )
    `;


    visual.style.opacity =
        1 -
        heroProgress;



    /* ==================================================
       02 / CONCEPT
    ================================================== */

    statements.forEach(
        (
            statement,
            index
        ) => {

            const trigger =
                0.35 +
                index * 0.2;


            statement.classList.toggle(
                "show",
                heroProgress >
                trigger
            );

        }
    );


    conceptJapanese.classList.toggle(
        "show",
        heroProgress > 0.9
    );



    /* ==================================================
       03 / MISSION
    ================================================== */

    const missionTop =
        mission
        .getBoundingClientRect()
        .top;


    missionContent.classList.toggle(
        "show",
        missionTop <
        screenHeight * 0.8
    );



    /* ==================================================
       04 / KEYWORDS
    ================================================== */

    const keywordsTop =
        keywordsSection
        .getBoundingClientRect()
        .top;


    const keywordsScrolled =
        Math.max(
            0,
            -keywordsTop
        );


    let keywordIndex =
        Math.floor(
            keywordsScrolled /
            screenHeight
        );


    keywordIndex =
        Math.max(
            0,
            Math.min(
                keywordIndex,
                keywords.length - 1
            )
        );


    keywords.forEach(
        (
            keyword,
            index
        ) => {

            keyword.classList.toggle(
                "active",
                index ===
                keywordIndex
            );

        }
    );



    /* ==================================================
       05 / VISION
    ================================================== */

    const visionProgress =
        getSectionProgress(
            visionSection
        );



    /*
       DANCE

       0 → 0.18
    */

    const danceProgress =
        rangeProgress(
            visionProgress,
            0.02,
            0.18
        );


    visionWords.dance.style.opacity =
        danceProgress;


    visionWords.dance.style.transform =
        `
        translate(
            -50%,
            ${(1 - danceProgress) * 40}px
        )
        `;



    /*
       MUSIC

       0.20 → 0.36
    */

    const musicProgress =
        rangeProgress(
            visionProgress,
            0.20,
            0.36
        );


    visionWords.music.style.opacity =
        musicProgress;


    visionWords.music.style.transform =
        `
        translate(
            -50%,
            ${(1 - musicProgress) * 40}px
        )
        `;



    /*
       ART

       0.38 → 0.54
    */

    const artProgress =
        rangeProgress(
            visionProgress,
            0.38,
            0.54
        );


    visionWords.art.style.opacity =
        artProgress;


    visionWords.art.style.transform =
        `
        translate(
            -50%,
            ${(1 - artProgress) * -40}px
        )
        `;



    /*
       PEOPLE

       0.56 → 0.72
    */

    const peopleProgress =
        rangeProgress(
            visionProgress,
            0.56,
            0.72
        );


    visionWords.people.style.opacity =
        peopleProgress;


    visionWords.people.style.transform =
        `
        translate(
            -50%,
            ${(1 - peopleProgress) * -40}px
        )
        `;



    /* ==================================================
       VISION CONNECTION LINES
    ================================================== */

    /*
       线条从 0.68 开始出现
    */

    const lineProgress =
        rangeProgress(
            visionProgress,
            0.68,
            0.90
        );


    visionLines.forEach(
        (
            line
        ) => {

            line.style.opacity =
                lineProgress;


            line.style.transform =
                `
                translateX(-50%)
                scaleY(
                    ${lineProgress}
                )
                `;

        }
    );



    /* ==================================================
       VISION DESCRIPTION
    ================================================== */

    const descriptionProgress =
        rangeProgress(
            visionProgress,
            0.88,
            1
        );


    visionDescription.style.opacity =
        descriptionProgress;


    visionDescription.style.transform =
        `
        translateY(
            ${(1 - descriptionProgress) * 20}px
        )
        `;



    /* ==================================================
       06 / PHILOSOPHY
    ================================================== */

    const philosophyProgress =
        getSectionProgress(
            philosophySection
        );



    /*
       MAIN TEXT
    */

    const textProgress =
        rangeProgress(
            philosophyProgress,
            0.05,
            0.65
        );


    philosophyText.style.opacity =
        1 -
        textProgress * 0.8;


    philosophyText.style.transform =
        `
        translateY(
            ${-textProgress * 40}px
        )
        `;



    /*
       JAPANESE
    */

    const japaneseProgress =
        rangeProgress(
            philosophyProgress,
            0.2,
            0.75
        );


    philosophyJapanese.style.opacity =
        0.55 *
        (
            1 -
            japaneseProgress
        );



    /*
       FINAL LOGO
    */

    const finalProgress =
        rangeProgress(
            philosophyProgress,
            0.55,
            0.95
        );


    philosophyFinal.style.opacity =
        finalProgress;


    philosophyFinal.style.transform =
        `
        scale(
            ${
                0.8 +
                finalProgress * 0.2
            }
        )
        `;

}



/* ==================================================
   OPTIMIZED SCROLL
================================================== */

let ticking = false;


window.addEventListener(
    "scroll",
    () => {

        if (
            !ticking
        ) {

            window.requestAnimationFrame(
                () => {

                    updatePage();

                    ticking = false;

                }
            );


            ticking = true;

        }

    },
    {
        passive: true
    }
);



/* ==================================================
   RESIZE
================================================== */

window.addEventListener(
    "resize",
    updatePage
);



/* ==================================================
   INITIAL
================================================== */

window.addEventListener(
    "load",
    updatePage
);


updatePage();