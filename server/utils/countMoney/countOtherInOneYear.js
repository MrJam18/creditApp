module.exports = function countOther(main, percents, penalties){
    main = Number(main.toFixed(2));
    percents = Number(percents.toFixed(2));
    penalties = Number(penalties.toFixed(2));
    if (percents < 0){
        main += percents;
        reversePercents = percents
        percents = 0;
        if (main < 0) {
            reverseMain = main
            penalties += main;
            main = 0;
        }
    }

    return {main, percents, penalties}
}