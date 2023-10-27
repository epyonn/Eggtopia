export default evolutionData = new Map([
    ['wolf', new Map([
        [0, {
            image: require('../assets/wolf/egg/egg-idle.gif'),
            walking_image: require('../assets/wolf/egg/egg-idle.gif'),
            name: 'wolf-egg'
        }],
        [1, {
            image: require('../assets/wolf/firstEvo/wolf-first-idle.gif'),
            walking_image: require('../assets/wolf/firstEvo/wolf-first-walking.gif'),
            name: 'wolf-first-evo',
            type: 'pet',
        }],
        [2, {
            image: require('../assets/wolf/secondEvo/wolf-second-idle.gif'),
            walking_image: require('../assets/wolf/secondEvo/wolf-second-walking2.gif'),
            name: 'wolf-second-evo',
            type: 'pet',

        }],
        [3, {
            image: require('../assets/wolf/thirdEvo/wolf-third-idle.gif'),
            walking_image: require('../assets/wolf/thirdEvo/wolf-third-walking.gif'),
            name: 'wolf-third-evo',
            expProgress: 1
        }]
    ])],
    ['dragon', new Map ([
        [0, {
            image: require('../assets/dragon/egg/egg-idle.gif'),
            walking_image: require('../assets/dragon/egg/egg-idle.gif'),
            name: 'dragon-egg'
        }],
        [1, {
            image: require('../assets/dragon/firstEvo/dragon-first-idle.gif'),
            walking_image: require('../assets/dragon/firstEvo/dragon-first-walking.gif'),
            name: 'dragon-first-evo',
            type: 'pet',

        }],
        [2, {
            image: require('../assets/dragon/secondEvo/dragon-second-idle.gif'),
            walking_image: require('../assets/dragon/secondEvo/dragon-second-walking.gif'),
            name: 'dragon-second-evo',
            

        }],
        [3, {
            image: require('../assets/dragon/thirdEvo/dragon-third-idle.gif'),
            walking_image: require('../assets/dragon/thirdEvo/dragon-third-fire.gif'),
            name: 'dragon-third-evo',
            expProgress: 1,
        }]

    ])],
    ['bird', new Map ([
        [0, {
            image: require('../assets/bird/egg/egg-idle.gif'),
            walking_image: require('../assets/bird/egg/egg-idle.gif'),
            name: 'bird-egg'
        }],
        [1, {
            image: require('../assets/bird/firstEvo/bird-first-idle.gif'),
            walking_image: require('../assets/bird/firstEvo/bird-first-walking.gif'),
            name: 'bird-first-evo',
            type: 'pet',

        }],
        [2, {
            image: require('../assets/bird/secondEvo/bird-second-idle.gif'),
            walking_image: require('../assets/bird/secondEvo/bird-second-running.gif'),
            name: 'bird-second-evo'

        }],
        [3, {
            image: require('../assets/bird/thirdEvo/bird-third-idle.gif'),
            walking_image: require('../assets/bird/thirdEvo/bird-third-running.gif'),
            name: 'bird-third-evo',
            expProgress: 1,

        }]

    ])],

])