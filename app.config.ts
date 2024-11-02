export default defineAppConfig({
    logo: '',

    url: 'https://notes.cnkbekir.dev/',

    theme: 'mistral',

    // The name of the blog itself
    name: 'cnkbekir notes',
    avatar: '/images/avatar.jpg',
    // The description of the blog if any
    description:  'lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',

    socials: {
        twitter: '',
        mastodon: '',
        youtube: '',
        linkedin: 'https://www.linkedin.com/in/cnkbekir/',
        facebook: '',
        instagram: '',
        github: 'https://github.com/cnkbekir',

        // possible values : 'facebook', 'twitter', 'linkedin', 'email', 'pinterest', 'reddit', 'pocket', 'whatsapp', 'telegram', 'skype'
        // see https://github.com/stefanobartoletti/nuxt-social-share
        sharing_networks: ['twitter', 'pocket']
    },

    newsletter: {
        enabled: false,},
    comments: {
        enabled: false,
    },
    table_of_contents: false,

    // the list of authors
    // the default author will be used for all posts if no author is specified
    // and the mistral theme use the default author for the main page
    authors: [
        {
            username: 'cnkbekir',
            default: true,
            name: 'Bekir Çankaya',
            description:
                'Software Developer',
            avatar: '/images/avatar.jpg',
            socials: {
                linkedin: 'https://www.linkedin.com/in/cnkbekir/',
                github: 'https://github.com/cnkbekir',
            },
        },
    ],

    menu: () => [
        { name: 'Home', path: '/' },
        { name: 'Archives', path: '/archives' },
    ],

    robots: [
        {
            UserAgent: '*',
            Allow: ['/'],
        },
    ],
})
