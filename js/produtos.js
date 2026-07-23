const produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
const produtos = [

{
    categoria:"vestidos",

    nome:"Vestido Élise",

    preco:289.90,

    imagem:"imagens/Vestido Élise.png",

    avaliacao:"★★★★★",

    nota:"4.9 (235)",

    parcelamento:"ou 6x de R$ 48,31 sem juros",

    descricao:"Vestido longo elegante em tecido premium.",

    descricaoCompleta:"Ideal para ocasiões especiais com acabamento sofisticado.",

    detalhes:[
        "✓ Tecido Premium",
        "✓ Modelagem Elegante",
        "✓ Caimento Perfeito"
    ],

    tamanhos:["PP","P","M","G","GG"]

},

    {
        nome: "Vestido Serenity",
        categoria: "vestidos",
        imagem: "imagens/Vestido Serenity.png",
        preco: 199.90,

        avaliacao: "4.9 (198)",

        descricao: "Vestido ombro a ombro em tom azul claro, delicado e elegante.",

        descricaoCompleta:
        "Vestido perfeito para diversas ocasiões, trazendo leveza, conforto e sofisticação.",

        detalhes: [
            "Azul Claro",
            "Ombro a Ombro",
            "Tecido Confortável"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },


    {
        nome: "Vestido Sophie",
        categoria: "vestidos",
        imagem: "imagens/Vestido Sophie.png",
        preco: 249.90,

        avaliacao: "4.9 (176)",

        descricao:
        "Vestido de um ombro só com drapeado elegante e caimento sofisticado.",

        descricaoCompleta:
        "Uma peça premium para eventos especiais, combinando elegância e modernidade.",

        detalhes: [
            "Um Ombro",
            "Azul Marinho",
            "Tecido Premium"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },


    {
        nome: "Vestido Celeste",
        categoria: "vestidos",
        imagem: "imagens/Vestido Celeste.png",
        preco: 219.90,

        avaliacao: "4.9 (154)",

        descricao:
        "Vestido curto de um ombro só com drapeado lateral e caimento impecável.",

        descricaoCompleta:
        "Perfeito para festas e ocasiões especiais, unindo conforto e elegância.",

        detalhes: [
            "Um Ombro",
            "Azul Serenity",
            "Tecido Premium"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },


    {
        nome: "Look Casual Denim",
        categoria: "conjuntos",
        imagem: "imagens/Look Casual Denim.png",
        preco: 239.90,

        avaliacao: "5.0 (143)",

        descricao:
        "Conjunto casual composto por polo branca e calça jeans wide leg.",

        descricaoCompleta:
        "Um look moderno e confortável para o dia a dia, combinando estilo urbano e elegância.",

        detalhes: [
            "Wide Leg",
            "Polo Canelada",
            "Jeans Premium"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },


    {
        nome: "Conjunto Jeans Grafite",
        categoria: "conjuntos",
        imagem: "imagens/Conjunto Jeans Grafite.png",
        preco: 259.90,

        avaliacao: "4.9 (127)",

        descricao:
        "Conjunto jeans com corset estruturado e calça cargo wide leg.",

        descricaoCompleta:
        "Um visual marcante inspirado nas tendências urbanas, perfeito para quem gosta de personalidade no look.",

        detalhes: [
            "Corset Jeans",
            "Wide Leg",
            "Lavagem Grafite"
        ],

        tamanhos: [
            "P",
            "M",
            "G",
            "GG"
        ]
    },
    {
    nome: "Body Halter Basic Preto",
    categoria: "blusas",
    imagem: "imagens/Body Halter Basic Preto.png",
    preco: 89.90,

    avaliacao: "4.9 (235)",

    descricao:
    "Body frente única confeccionado em tecido macio e confortável.",

    descricaoCompleta:
    "Uma peça minimalista e versátil, perfeita para looks elegantes no dia a dia.",

    detalhes: [
        "Cor Preto",
        "Modelo Frente Única",
        "Tecido com Elasticidade"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Calça Cargo Urban",
    categoria: "conjuntos",
    imagem: "imagens/Calça Cargo Urban.png",
    preco: 179.90,

    avaliacao: "5.0 (112)",

    descricao:
    "Calça cargo de cintura alta com modelagem ampla e moderna.",

    descricaoCompleta:
    "Uma peça urbana e versátil, ideal para combinar com tops e croppeds.",

    detalhes: [
        "Cargo",
        "Wide Leg",
        "Off White"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Conjunto Elegance",
    categoria: "conjuntos",
    imagem: "imagens/Conjunto Elegance.png",
    preco: 259.90,

    avaliacao: "4.9 (164)",

    descricao:
    "Blusa de gola alta combinada com calça pantalona para um visual elegante.",

    descricaoCompleta:
    "Um conjunto sofisticado e confortável, perfeito para ocasiões especiais ou produções refinadas.",

    detalhes: [
        "Off White",
        "Calça Pantalona",
        "Modelagem Premium"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Shorts Saia Jeans",
    categoria: "saias",
    imagem: "imagens/Shorts Saia Jeans.png",
    preco: 129.90,

    avaliacao: "4.9 (138)",

    descricao:
    "Shorts saia jeans com design assimétrico e lavagem moderna.",

    descricaoCompleta:
    "Uma peça prática e estilosa, perfeita para compor looks casuais e modernos.",

    detalhes: [
        "Jeans Premium",
        "Shorts Saia",
        "Lavagem Clara e Escura"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},
{
    nome: "Shorts Saia Aurora",
    categoria: "saias",
    imagem: "imagens/Shorts Saia Aurora.png",
    preco: 119.90,

    avaliacao: "4.9 (121)",

    descricao:
    "Shorts saia em tecido encorpado com detalhe metálico frontal.",

    descricaoCompleta:
    "A combinação perfeita entre elegância, conforto e versatilidade.",

    detalhes: [
        "Shorts Saia",
        "Off White",
        "Detalhe Dourado"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Short Alfaiataria Belle",
    categoria: "saias",
    imagem: "imagens/Short Alfaiataria Belle.png",
    preco: 109.90,

    avaliacao: "5.0 (96)",

    descricao:
    "Shorts de alfaiataria com cinto incluso para produções elegantes.",

    descricaoCompleta:
    "Uma peça sofisticada que une conforto e estilo para diversas ocasiões.",

    detalhes: [
        "Alfaiataria",
        "Cinto Incluso",
        "Diversas Cores"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Conjunto Aurora",
    categoria: "conjuntos",
    imagem: "imagens/Conjunto Aurora.png",
    preco: 219.90,

    avaliacao: "5.0 (142)",

    descricao:
    "Conjunto moderno em tule com saia e blusa, perfeito para ocasiões especiais.",

    descricaoCompleta:
    "Uma produção delicada e elegante, com tecido leve e modelagem moderna.",

    detalhes: [
        "Tule Leve",
        "Azul Royal",
        "Modelagem Moderna"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Conjunto Valentina",
    categoria: "conjuntos",
    imagem: "imagens/Conjunto Valentina.png",
    preco: 199.90,

    avaliacao: "4.9 (189)",

    descricao:
    "Conjunto sofisticado composto por cropped de um ombro só e saia curta.",

    descricaoCompleta:
    "Um look moderno e marcante, perfeito para festas, eventos especiais e ocasiões onde o estilo faz diferença.",

    detalhes: [
        "Cropped Um Ombro",
        "Manga Fluida",
        "Azul Royal Premium"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
},


{
    nome: "Cropped Tricô Oceano",
    categoria: "blusas",
    imagem: "imagens/Cropped Tricô Oceano.png",
    preco: 89.90,

    avaliacao: "5.0 (105)",

    descricao:
    "Cropped em tricô com acabamento sofisticado e degradê em tons de azul.",

    descricaoCompleta:
    "Uma peça moderna e confortável, ideal para criar looks leves e cheios de personalidade.",

    detalhes: [
        "Tricô Premium",
        "Azul Degradê",
        "Modelagem Confortável"
    ],

    tamanhos: [
        "P",
        "M",
        "G",
        "GG"
    ]
}
];


produtos.push(...produtosSalvos);