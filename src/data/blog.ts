/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { NewsletterArticle } from '../types';
import blogTreeBarImg from '../assets/images/blog_tree_bar_1787673774355.jpg';
import blogCacaoStagesImg from '../assets/images/blog_cacao_stages_1787673790395.jpg';
import blogCacaoRitualImg from '../assets/images/blog_cacao_ritual_1787673807596.jpg';
import blogClinicalCacaoImg from '../assets/images/blog_clinical_cacao_1787673822681.jpg';
import blogWomensHealthImg from '../assets/images/blog_womens_health_1787673836419.jpg';
import blogCardioCacaoImg from '../assets/images/blog_cardio_cacao_1787673851283.jpg';

export interface BlogPostReference {
  title: string;
  url?: string;
}

export interface BlogPost extends NewsletterArticle {
  category: string;
  tags: string[];
  referencesList?: BlogPostReference[];
  vimeoVideoId?: string;
  videoTitle?: string;
  videoCaption?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Qual a diferença de cacau Tree to Bar, Bean To Bar e Industrializado',
    summary: 'O chocolate mudou e hoje é tratado como vinho e café especiais. Entenda as diferenças fundamentais entre o processo industrial em massa, o movimento Bean to Bar e o controle total do Tree to Bar.',
    category: 'Origem & Processamento',
    author: 'Será Cacau',
    publishDate: '25 de Agosto, 2026',
    readTime: '5 min',
    imageUrl: blogTreeBarImg,
    tags: ['Tree to Bar', 'Bean to Bar', 'Torra Suave', 'Flavonoides', 'Artesanal'],
    content: `O chocolate mudou. Hoje, ele é tratado como vinho e café especiais: origem, terroir, fermentação e torra passaram a influenciar diretamente sabor, aroma e qualidade nutricional. Nesse contexto surgem os termos Bean to Bar e Tree to Bar, que representam uma forma mais artesanal e cuidadosa de produzir chocolate.

### Chocolate industrializado
O chocolate industrializado é produzido em larga escala, com foco em padronização, custo e estabilidade de sabor. Para isso, a indústria costuma utilizar blends de cacau de diferentes origens, maior quantidade de açúcar, emulsificantes e processos mais rápidos.

Um dos pontos mais importantes é a torra: normalmente feita em temperaturas mais altas e em menor tempo. Essa torra rápida ajuda a mascarar defeitos do grão e acelerar a produção, mas também reduz parte dos compostos aromáticos e dos flavonoides presentes naturalmente no cacau. Como resultado, o sabor tende a ser mais uniforme, menos complexo e menos frutado.

### O que é Bean to Bar?
Bean to Bar significa “do grão à barra”. Nesse modelo, o produtor controla praticamente todas as etapas da fabricação do chocolate: escolha do cacau, fermentação, secagem, torra e moagem.

O objetivo é preservar as características naturais do grão e destacar o terroir de cada origem. Por isso, chocolates Bean to Bar costumam apresentar sabores mais complexos, com notas que podem lembrar frutas vermelhas, castanhas, mel, caramelo ou até aromas florais.

A torra aqui geralmente é mais lenta e delicada, permitindo desenvolver aroma sem destruir compostos sensíveis do cacau. Isso também ajuda a preservar melhor os flavonoides antioxidantes.

### O que é Tree to Bar?
O conceito Tree to Bar vai ainda além. Nesse caso, a mesma marca cultiva o cacau e produz o chocolate final. Ou seja, existe controle total desde a árvore até a barra.

Isso permite acompanhar de perto fatores fundamentais como ponto de colheita, fermentação e secagem, criando chocolates com identidade sensorial muito mais evidente e maior rastreabilidade. Todo chocolate Tree to Bar é Bean to Bar, mas nem todo Bean to Bar é Tree to Bar.

### A importância da torra
A torra é uma das etapas mais importantes da produção do chocolate. É nela que surgem muitos dos aromas e sabores característicos do cacau.

Nas produções artesanais, a torra lenta em temperaturas mais baixas preserva notas mais delicadas e uma acidez equilibrada, trazendo maior complexidade sensorial. Já na indústria, a torra rápida e mais intensa tende a gerar sabores mais “queimados” e menos complexos.

Além do sabor, a temperatura da torra influencia diretamente a quantidade de flavonoides presentes no chocolate. Estudos mostram que temperaturas elevadas reduzem compostos como catequinas e epicatequinas, associados aos benefícios cardiovasculares do cacau.

### Acidez e notas de sabor
Ao contrário do que muita gente imagina, a acidez do chocolate não é necessariamente um defeito. Em chocolates finos, ela pode ser desejável e contribuir para sabores mais vivos e sofisticados.

A acidez depende principalmente da fermentação, da origem do cacau e da torra. Quando bem equilibrada, pode trazer notas cítricas, vínicas e frutadas. Cacaus latino-americanos, por exemplo, costumam apresentar perfis mais florais e frutados, enquanto alguns cacaus africanos têm sabores mais intensos e terrosos.

### Flavonoides: o lado funcional do cacau
O cacau é uma das maiores fontes alimentares de flavonoides, compostos bioativos com ação antioxidante e anti-inflamatória.

O problema é que processos industriais mais agressivos — como torra intensa e alcalinização — reduzem significativamente esses compostos. Por isso, um chocolate com alto percentual de cacau nem sempre significa maior qualidade nutricional. A forma como ele foi produzido também importa.

### Conclusão
A principal diferença entre chocolates industrializados, Bean to Bar e Tree to Bar está no cuidado com a matéria-prima e no controle do processo.

Enquanto a indústria prioriza escala e padronização, os movimentos Bean to Bar e Tree to Bar buscam preservar a identidade natural do cacau, criando chocolates mais complexos, aromáticos e potencialmente mais ricos em compostos bioativos.`,
    referencesList: [
      { title: 'Kothe L, Zimmermann BF, Galensa R. The effect of processing on cocoa polyphenols. Food Chemistry.' },
      { title: 'Oracz J, Nebesny E, Zyzelewicz D. Impact of roasting conditions on the bioactive compounds and antioxidant activity of cocoa beans.' },
      { title: 'Aprotosoaie AC et al. Cocoa and chocolate: source of biologically active compounds and health benefits.' },
      { title: 'From Cocoa to Chocolate: Effect of Processing on Flavanols and Methylxanthines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9698929/' },
      { title: 'Impact of Roasting on the Flavan-3-ol Composition, Sensory Properties and Bioactivity of Cocoa', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5868974/' },
      { title: 'Revisão Brasileira de Tecnologia de Alimentos sobre polifenóis do cacau', url: 'https://www.scielo.br/j/bjft/a/TZgKyJdNv3zC3fZFQQ4xG7z/' }
    ]
  },
  {
    id: 'blog-2',
    title: 'O que é cacau e quais são todas as etapas até virar chocolate',
    summary: 'Conheça toda a jornada do fruto Theobroma cacao na árvore da floresta tropical até a pasta pura e a barra: colheita, fermentação biológica, secagem solar, torra, nibs e prensagem.',
    category: 'Botânica & Produção',
    author: 'Será Cacau',
    publishDate: '24 de Agosto, 2026',
    readTime: '6 min',
    imageUrl: blogCacaoStagesImg,
    tags: ['Theobroma Cacao', 'Fermentação', 'Nibs', 'Manteiga de Cacau', 'Pasta de Cacau'],
    content: `Quando pensamos em chocolate, normalmente imaginamos apenas a barra pronta. Mas o processo começa muito antes disso: tudo nasce no cacau, fruto do cacaueiro (*Theobroma cacao*), uma árvore tropical originária da América do Sul.
O nome científico significa “alimento dos deuses” — e faz sentido. O cacau é uma das matérias-primas mais complexas da gastronomia, rico em compostos aromáticos, minerais e flavonoides antioxidantes.

### O fruto do cacau
O cacau é um fruto que cresce diretamente no tronco da árvore. Sua casca é grossa e pode ter colorações variadas, indo do verde ao amarelo, vermelho ou roxo, dependendo da variedade e do grau de maturação.
Dentro do fruto existem dezenas de sementes envolvidas por uma polpa branca, doce e levemente ácida. Essas sementes são os famosos grãos de cacau.

É a partir delas que surgem:
* chocolate,
* nibs,
* manteiga de cacau,
* cacau em pó,
* pasta de cacau,
* e até chá da casca do cacau.

### A fermentação: onde o sabor começa
Depois da colheita, o fruto é aberto e os grãos são retirados junto com a polpa.
Esses grãos passam por fermentação durante alguns dias, geralmente em caixas de madeira. Nesse processo, micro-organismos transformam os açúcares da polpa e iniciam mudanças químicas fundamentais para o desenvolvimento do sabor do chocolate.
Sem fermentação, o cacau teria sabor extremamente amargo e pouco aromático.

É nessa etapa que começam a surgir notas:
* frutadas,
* florais,
* vínicas,
* cítricas,
* ou mais intensas e terrosas.

### Secagem
Após a fermentação, os grãos são secos ao sol ou em estufas.
A secagem reduz a umidade e ajuda a estabilizar os compostos aromáticos desenvolvidos anteriormente. Se essa etapa for mal feita, o cacau pode desenvolver fungos ou sabores desagradáveis.

### A torra do cacau
Depois de secos, os grãos são torrados.
A torra é responsável por desenvolver os aromas clássicos de chocolate através de reações químicas como a reação de Maillard.
Dependendo da temperatura e do tempo utilizados, o cacau pode apresentar sabores diferentes:
* torras suaves preservam notas frutadas e florais;
* torras intensas geram sabores mais tostados, amargos e menos complexos.

A torra também influencia a quantidade de flavonoides presentes no produto final. Temperaturas muito elevadas reduzem parte desses compostos antioxidantes.

### Da torra ao nib de cacau
Após a torra, os grãos passam por um processo de quebra e separação da casca.
A parte interna do grão é chamada de **nib de cacau**. O nib é basicamente o cacau puro torrado e fragmentado, sem açúcar e sem leite.
Ele possui sabor intenso, amargo e aromático, além de ser rico em flavonoides e gorduras naturais do cacau.

Já a casca, que antes era descartada, hoje também ganhou espaço gastronômico. Ela pode ser utilizada para preparar chá de cacau, uma bebida aromática com notas achocolatadas e baixo teor calórico.

### Pasta de cacau: o cacau em sua forma mais pura
Quando os nibs são moídos, ocorre liberação da gordura natural presente no grão: a manteiga de cacau.
Essa moagem forma uma massa líquida conhecida como:
* pasta de cacau,
* massa de cacau,
* ou licor de cacau.

Apesar do nome “licor”, não possui álcool. Trata-se simplesmente do cacau integral moído, contendo:
* sólidos do cacau,
* manteiga de cacau,
* compostos aromáticos,
* e flavonoides.

Essa é a forma mais pura do cacau utilizada para produzir chocolate.

### Separação: manteiga de cacau e cacau em pó
A partir da pasta de cacau é possível separar dois componentes principais:
* manteiga de cacau,
* e sólidos de cacau.
Isso é feito por prensagem.

#### Manteiga de cacau
A manteiga de cacau é a gordura natural do cacau. Ela possui textura macia e é responsável pelo derretimento característico do chocolate na boca. Além do uso alimentício, também é muito utilizada em cosméticos.

#### Cacau em pó
Após a retirada da gordura, sobra uma “torta” sólida rica em compostos do cacau. Essa torta é moída e transformada no cacau em pó.
Quanto menor a quantidade de gordura residual, mais alcalino e seco tende a ficar o pó. Alguns processos industriais ainda realizam alcalinização do cacau, reduzindo acidez e amargor, mas também diminuindo parte dos flavonoides.

### Então, o que é o chocolate?
O chocolate é uma mistura de:
* pasta de cacau,
* manteiga de cacau,
* açúcar,
* e, em alguns casos, leite.

A proporção desses ingredientes determina o tipo de chocolate:
* **Chocolate amargo**: Possui maior quantidade de cacau e menos açúcar. Costuma preservar mais compostos bioativos e sabores naturais do grão.
* **Chocolate ao leite**: Recebe adição de leite em pó ou leite condensado, resultando em sabor mais doce e textura cremosa.
* **Chocolate branco**: Muita gente não sabe, mas o chocolate branco não contém sólidos de cacau. Ele é produzido basicamente com manteiga de cacau, açúcar, leite em pó e aromatizantes como baunilha. Por isso, possui sabor completamente diferente do chocolate tradicional e praticamente não apresenta os flavonoides encontrados nos sólidos do cacau.

### Muito além do chocolate
Hoje, praticamente todas as partes do cacau são aproveitadas:
* nibs para culinária;
* manteiga de cacau para chocolates e cosméticos;
* cacau em pó para bebidas e receitas;
* pasta de cacau para chocolates artesanais;
* casca para chá;
* polpa para sucos e fermentados.

O cacau deixou de ser apenas matéria-prima do chocolate e passou a ser valorizado como um alimento complexo, rico em cultura, sensorialidade e compostos bioativos.`,
    referencesList: [
      { title: 'Beckett ST. The Science of Chocolate. Royal Society of Chemistry.' },
      { title: 'Aprotosoaie AC et al. Cocoa and chocolate: source of biologically active compounds and health benefits.' },
      { title: 'From Cocoa to Chocolate: Effect of Processing on Flavanols and Methylxanthines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9698929/' },
      { title: 'Chocolate and Health: A Review. Nutrients', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/' },
      { title: 'Batista NN et al. Fermentation of cocoa beans and sensory quality of chocolate. Food Research International.' }
    ]
  },
  {
    id: 'blog-3',
    title: 'O que é o ritual do cacau e quando surgiu',
    summary: 'A história milenar do cacau como alimento sagrado dos povos Maias e Astecas, sua redescoberta contemporânea nas práticas de presença e bem-estar, e a ciência por trás da sensação de acolhimento.',
    category: 'Cultura & Ancestralidade',
    author: 'Será Cacau',
    publishDate: '23 de Agosto, 2026',
    readTime: '5 min',
    imageUrl: blogCacaoRitualImg,
    tags: ['Ritual do Cacau', 'Maias e Astecas', 'Teobromina', 'Sagrado Feminino', 'Presença'],
    content: `Muito antes de se transformar em chocolate, o cacau já era considerado uma planta sagrada por civilizações antigas da América Central e do Sul. Povos como Maias e Astecas utilizavam o cacau em rituais espirituais, celebrações, oferendas e cerimônias religiosas há milhares de anos.
O nome científico do cacaueiro, *Theobroma cacao*, significa literalmente “alimento dos deuses”, termo criado no século XVIII pelo botânico Carl Linnaeus inspirado justamente na importância simbólica do cacau para essas civilizações.

### O cacau nas civilizações antigas
Os primeiros registros do uso ritualístico do cacau datam de aproximadamente 1500 a.C., entre povos mesoamericanos.
Maias e Astecas preparavam bebidas feitas com pasta de cacau, água e especiarias. Diferente do chocolate atual, essas bebidas eram amargas, intensas e utilizadas em contextos espirituais, medicinais e cerimoniais.

O cacau era associado:
* à fertilidade,
* abundância,
* conexão espiritual,
* força vital,
* e expansão da consciência.

Em algumas culturas, os grãos de cacau chegaram até a ser utilizados como moeda de troca.

### Como surgiu o ritual do cacau moderno?
O chamado “ritual do cacau” moderno é inspirado nessas tradições ancestrais, mas ganhou força principalmente nas últimas décadas, dentro de movimentos ligados:
* ao autoconhecimento,
* espiritualidade,
* práticas meditativas,
* yoga,
* terapias integrativas,
* e cerimônias do sagrado feminino.

Hoje, o ritual costuma envolver:
* preparo consciente da bebida de cacau;
* meditação;
* música;
* respiração;
* dança;
* conexão emocional;
* intenção e presença.

Em muitos encontros, o cacau é utilizado como um facilitador simbólico de abertura emocional e conexão interior.

### O cacau e o sagrado feminino
Nos últimos anos, o ritual do cacau passou a estar muito presente em encontros ligados ao chamado “sagrado feminino”.
Nesses contextos, o cacau é frequentemente associado:
* à conexão emocional;
* acolhimento;
* escuta interna;
* intuição;
* sensibilidade;
* e estados meditativos.

Embora existam elementos contemporâneos adicionados às cerimônias atuais, muitas práticas buscam resgatar a ideia ancestral do cacau como alimento sagrado e ferramenta de conexão coletiva.

### Por que o cacau gera sensação de bem-estar?
O cacau contém diversos compostos bioativos capazes de influenciar humor, energia e percepção de prazer.
Entre eles:
* **teobromina**,
* **magnésio**,
* **flavonoides**,
* **feniletilamina**,
* **triptofano**.

A teobromina possui efeito estimulante mais suave que a cafeína, promovendo sensação de disposição sem gerar tanta agitação.
Já os flavonoides ajudam na circulação sanguínea e podem melhorar fluxo cerebral e função endotelial. Alguns estudos também relacionam o consumo de cacau à melhora do humor e redução da percepção de estresse.

### Quantidade utilizada nos rituais
No dia a dia, muitas pessoas utilizam cerca de **15 g de cacau puro** como forma de consumo funcional, geralmente em bebidas quentes ou preparações.
Já em cerimônias de cacau, é comum utilizar doses maiores, em torno de **30 g de pasta de cacau puro**, buscando uma experiência mais intensa sensorial e corporal.

O ideal é que o cacau utilizado seja:
* puro;
* sem açúcar;
* minimamente processado;
* preferencialmente artesanal.

### Ritual, ciência e simbolismo
Apesar do forte componente espiritual e simbólico presente nas cerimônias modernas, muitos dos efeitos percebidos também possuem explicações fisiológicas relacionadas aos compostos bioativos do cacau.

Ainda assim, o ritual do cacau vai além da composição química. Para muitas pessoas, ele representa:
* pausa,
* presença,
* conexão,
* introspecção,
* e experiência coletiva.

Talvez seja justamente essa combinação entre ancestralidade, sabor, sensorialidade e simbolismo que explique por que o cacau continua sendo considerado especial há milhares de anos.`,
    referencesList: [
      { title: 'Dillinger TL et al. Food of the Gods: Cure for Humanity? A Cultural History of the Medicinal and Ritual Use of Chocolate.' },
      { title: 'Aprotosoaie AC et al. Cocoa and chocolate: source of biologically active compounds and health benefits.' },
      { title: 'Chocolate and Health: A Review. Nutrients', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/' },
      { title: 'Coe SD, Coe MD. The True History of Chocolate. Thames & Hudson.' },
      { title: 'Lippi D. Chocolate in History: Food, Medicine, Medi-food.' }
    ]
  },
  {
    id: 'blog-4',
    title: 'Como usar o cacau 100% orgânico e agroflorestal na prática clínica',
    summary: 'Guia prático para nutricionistas: da preservação fitoquímica em sistemas agroflorestais à dosagem diária de 10 a 15g, melhoria da adesão ao plano alimentar e redução do desejo por doces.',
    category: 'Nutrição Clínica & Prática',
    author: 'Será Cacau',
    publishDate: '22 de Agosto, 2026',
    readTime: '5 min',
    imageUrl: blogClinicalCacaoImg,
    tags: ['Prática Clínica', 'Agroflorestal', '100% Cacau', 'Prescrição', 'Adesão Alimentar'],
    content: `Durante muito tempo, o chocolate foi associado apenas a sobremesas e indulgência. Mas hoje sabemos que o cacau, especialmente em sua forma pura e minimamente processada, pode ser uma ferramenta interessante dentro da prática clínica nutricional.
O cacau 100% orgânico e agroflorestal reúne características importantes:
* maior preservação de compostos bioativos;
* menor processamento;
* rastreabilidade;
* cultivo mais sustentável;
* e maior valorização da biodiversidade.

Na prática clínica, ele pode ser utilizado não apenas pelo potencial funcional, mas também pela adesão alimentar e experiência sensorial.

### O que significa um cacau agroflorestal?
O sistema agroflorestal é um modelo de cultivo em que o cacau cresce integrado a outras espécies vegetais, respeitando ciclos naturais da floresta.
Diferente da monocultura intensiva, o cultivo agroflorestal favorece:
* biodiversidade;
* qualidade do solo;
* menor uso de agrotóxicos;
* equilíbrio ecológico;
* e desenvolvimento mais lento e complexo do fruto.

Além da questão ambiental, muitos produtores relatam impacto positivo no perfil sensorial do cacau, com sabores mais complexos e aromáticos.

### Por que o cacau 100% chama atenção na prática clínica?
O cacau puro é naturalmente rico em:
* flavonoides,
* magnésio,
* cobre,
* manganês,
* teobromina,
* e compostos fenólicos antioxidantes.

Estudos associam o consumo de cacau rico em flavonoides a possíveis benefícios relacionados:
* à função endotelial;
* circulação sanguínea;
* sensibilidade à insulina;
* modulação inflamatória;
* desempenho cognitivo;
* e humor.

Grande parte desses efeitos depende da qualidade do processamento. Produtos muito alcalinizados ou ultraprocessados tendem a apresentar menor quantidade de compostos bioativos.

### Como utilizar na prática clínica?
O cacau 100% pode ser incluído de diversas formas:
* bebidas quentes;
* smoothies;
* overnight oats;
* iogurtes;
* frutas;
* preparações proteicas;
* receitas funcionais;
* ou associado a oleaginosas.

Na prática, ele costuma funcionar muito bem como estratégia para:
* melhorar adesão alimentar;
* reduzir desejo por doces ultraprocessados;
* aumentar saciedade;
* e trazer mais prazer alimentar ao plano nutricional.

### Dose prática no dia a dia
Em geral, quantidades entre **10–15 g ao dia** costumam ser suficientes para utilização cotidiana dentro de uma alimentação equilibrada.
Doses maiores podem aumentar significativamente:
* aporte calórico;
* teobromina;
* e estímulo gastrointestinal em pessoas mais sensíveis.

Por isso, individualização continua sendo essencial.

### Atenção à composição
Nem todo “cacau” disponível no mercado possui alta concentração de compostos bioativos.
Na prática clínica, vale observar:
* percentual real de cacau;
* presença de açúcar;
* alcalinização;
* origem do grão;
* processamento;
* e qualidade da matéria-prima.

Produtos 100% costumam preservar melhor flavonoides, aroma e a identidade sensorial do cacau.

### O papel da experiência sensorial
Um ponto interessante do cacau na prática clínica é que ele ocupa um espaço entre funcionalidade e prazer alimentar.
O sabor intenso, a textura e os aromas ajudam a aumentar percepção de saciedade e satisfação. Em muitos pacientes, isso melhora relação com o plano alimentar sem necessidade de exclusão rígida de sabores doces.
Além disso, preparações com cacau frequentemente favorecem maior conexão alimentar e ritualização do consumo, algo que pode impactar positivamente comportamento alimentar e adesão.

### Cacau além do nutriente
Hoje, o cacau deixa de ser visto apenas como ingrediente e passa a ocupar um espaço mais amplo:
* alimento funcional;
* experiência sensorial;
* produto de origem;
* e ferramenta gastronômica dentro da nutrição clínica.

Quando associado a um cultivo orgânico e agroflorestal, também carrega uma dimensão ambiental importante, conectando saúde individual e sustentabilidade.`,
    referencesList: [
      { title: 'Chocolate and Health: A Review. Nutrients', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/' },
      { title: 'From Cocoa to Chocolate: Effect of Processing on Flavanols and Methylxanthines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9698929/' },
      { title: 'Katz DL et al. Cocoa and Cardiovascular Health. Circulation.' },
      { title: 'Aprotosoaie AC et al. Cocoa and chocolate: source of biologically active compounds and health benefits.' },
      { title: 'Crozier SJ et al. Bioavailability of dietary flavonoids in cocoa and chocolate.' }
    ]
  },
  {
    id: 'blog-5',
    title: 'O cacau na saúde da mulher: TPM, ciclo menstrual e concentração de cacau',
    summary: 'A relação bioquímica entre fase lútea, estrogênio, progesterona, triptofano, magnésio e o papel do cacau com alta concentração (70%, 80% e 100%) no suporte ao humor feminino.',
    category: 'Saúde da Mulher & Hormônios',
    author: 'Será Cacau',
    publishDate: '21 de Agosto, 2026',
    readTime: '6 min',
    imageUrl: blogWomensHealthImg,
    tags: ['Saúde da Mulher', 'TPM', 'Ciclo Menstrual', 'Serotonina', 'Magnésio'],
    content: `O desejo por chocolate durante a TPM é quase um consenso entre muitas mulheres. Mas será que isso acontece apenas pelo sabor? A ciência mostra que a relação entre cacau, humor e ciclo menstrual vai muito além de uma simples vontade de comer doce.
O cacau é rico em compostos bioativos capazes de influenciar neurotransmissores, circulação sanguínea, inflamação e percepção de bem-estar. Dependendo da concentração e da qualidade do chocolate, ele pode ter efeitos bastante diferentes no organismo feminino.

### Por que muitas mulheres sentem mais vontade de chocolate na TPM?
Durante a fase lútea — período que antecede a menstruação — ocorrem alterações hormonais importantes, especialmente na progesterona e no estrogênio. Essas mudanças podem influenciar:
* humor;
* ansiedade;
* irritabilidade;
* compulsão alimentar;
* retenção hídrica;
* fadiga;
* e desejo aumentado por alimentos mais palatáveis.

O chocolate aparece frequentemente nesse contexto porque combina açúcar, gordura, textura agradável e compostos que estimulam sensação de prazer. Mas o cacau também possui substâncias naturalmente associadas à modulação do humor.

### O que existe no cacau que pode ajudar?
O cacau contém:
* **magnésio**;
* **flavonoides**;
* **teobromina**;
* **triptofano**;
* **feniletilamina**.

O magnésio participa de processos relacionados à contração muscular, sistema nervoso e produção de neurotransmissores. Já o triptofano atua como precursor da serotonina, neurotransmissor associado à sensação de bem-estar.
Além disso, os flavonoides presentes no cacau possuem ação antioxidante e anti-inflamatória, podendo contribuir para melhora da circulação e redução do estresse oxidativo.

### A concentração do cacau importa?
Sim — e muito.
Grande parte dos chocolates consumidos durante a TPM possui:
* alto teor de açúcar;
* pouca quantidade real de cacau;
* e menor concentração de compostos bioativos.

Quanto maior a concentração de cacau, maior tende a ser a presença de flavonoides, minerais e compostos funcionais. Por isso, chocolates com **70%, 80% ou 100% cacau** costumam apresentar perfil nutricional mais interessante quando comparados aos chocolates mais açucarados.
Isso não significa que o chocolate precise ser encarado apenas de forma funcional. O contexto alimentar e o prazer também fazem parte da relação saudável com a comida.

### Cacau e sintomas da TPM
Embora o cacau não seja um tratamento isolado para TPM, alguns estudos sugerem que compostos presentes no chocolate amargo podem auxiliar em aspectos como:
* humor;
* fadiga;
* desejo alimentar;
* estresse;
* e desconforto emocional.

Além disso, o consumo consciente de cacau pode funcionar como estratégia de prazer alimentar sem necessidade de restrições extremas.

### Existe uma quantidade ideal?
Na prática clínica, quantidades em torno de **10–15 g de cacau puro ao dia** costumam ser utilizadas como consumo cotidiano funcional.
Isso pode ser feito através de:
* cacau 100%;
* chocolate com alta concentração de cacau;
* bebidas com pasta de cacau;
* ou preparações culinárias.

O mais importante é observar tolerância individual, qualidade do produto, composição e contexto alimentar da paciente.

### O cacau em diferentes fases do ciclo menstrual
A relação da mulher com o alimento também pode mudar ao longo do ciclo menstrual:
* **Na fase folicular**, algumas mulheres relatam maior disposição, menor fome e melhor resposta ao treino.
* **Na fase lútea**, é comum aumento da fome, da vontade de doces e da busca por alimentos mais reconfortantes.

Nesse cenário, o cacau pode ser incorporado estrategicamente de forma mais consciente e equilibrada, ajudando tanto na experiência sensorial quanto na adesão alimentar.

### Muito além do chocolate
Hoje, o cacau vem sendo cada vez mais estudado não apenas pelo sabor, mas também pelo potencial funcional relacionado ao humor, saúde cardiovascular, cognição e bem-estar.
Na saúde da mulher, ele ocupa um espaço interessante entre nutrição funcional, comportamento alimentar e prazer — especialmente quando utilizado em formas menos processadas e com maior concentração de cacau.`,
    referencesList: [
      { title: 'Chocolate Consumption and Women’s Health. Nutrients.' },
      { title: 'Aprotosoaie AC et al. Cocoa and chocolate: source of biologically active compounds and health benefits.' },
      { title: 'Chocolate and Health: A Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/' },
      { title: 'Grassi D et al. Cocoa flavanols, blood pressure and vascular function.' },
      { title: 'Bertone-Johnson ER et al. Magnesium intake and premenstrual syndrome.' }
    ],
    vimeoVideoId: '1221177462',
    videoTitle: 'Cacau na Saúde da Mulher: Prática e Ritual',
    videoCaption: 'Assista a esta reflexão em vídeo sobre a sinergia entre fitoquímicos do cacau, modulação hormonal e autocuidado feminino.'
  },
  {
    id: 'blog-6',
    title: 'Cacau e saúde cardiovascular: o que a ciência mostra?',
    summary: 'Aprofunde-se nos mecanismos vasculares dos flavonoides, biodisponibilidade de óxido nítrico, modulação endotelial e controle da pressão arterial promovidos pelo cacau puro.',
    category: 'Cardiometabolismo & Ciência',
    author: 'Será Cacau',
    publishDate: '20 de Agosto, 2026',
    readTime: '5 min',
    imageUrl: blogCardioCacaoImg,
    tags: ['Saúde Cardiovascular', 'Óxido Nítrico', 'Função Endotelial', 'Pressão Arterial', 'Flavanóis'],
    content: `Durante muitos anos, o chocolate foi visto apenas como um alimento ligado ao prazer e às sobremesas. Mas nas últimas décadas, o cacau passou a chamar atenção da ciência por seus possíveis efeitos na saúde cardiovascular.
Isso acontece porque o cacau é uma das maiores fontes alimentares de flavonoides, compostos bioativos associados à função vascular, ação antioxidante e modulação inflamatória.

Mas existe um detalhe importante: os benefícios estão relacionados principalmente ao cacau puro e menos processado — não ao excesso de açúcar presente em muitos chocolates ultraprocessados.

### O que existe no cacau que interessa à saúde cardiovascular?
O principal destaque são os flavonoides, especialmente:
* epicatequinas;
* catequinas;
* e procianidinas.

Esses compostos possuem ação antioxidante e ajudam na produção de **óxido nítrico**, molécula importante para o relaxamento dos vasos sanguíneos.
Na prática, isso pode favorecer:
* melhora da função endotelial;
* vasodilatação;
* circulação sanguínea;
* e controle da pressão arterial.

Além disso, o cacau também contém magnésio, cobre, potássio e teobromina.

### Cacau e pressão arterial
Diversos estudos mostram associação entre consumo de cacau rico em flavonoides e pequenas reduções na pressão arterial.
Um dos mecanismos mais estudados é justamente o aumento da biodisponibilidade de óxido nítrico, promovendo melhor relaxamento vascular.
Os efeitos observados costumam ser modestos, mas podem contribuir como parte de um contexto alimentar saudável.

### Função endotelial e circulação
O endotélio é a camada interna dos vasos sanguíneos e possui papel fundamental na saúde cardiovascular.
O estresse oxidativo, inflamação e hábitos alimentares inadequados podem prejudicar sua função ao longo do tempo.
Os flavonoides do cacau parecem atuar justamente nesse ponto, auxiliando:
* resposta vascular;
* circulação;
* e função endotelial.

Alguns estudos mostram melhora transitória da dilatação vascular após consumo de cacau rico em flavonoides.

### O processamento muda tudo
Nem todo chocolate apresenta alta quantidade de flavonoides.
Processos industriais como alcalinização, excesso de açúcar, torra intensa e ultraprocessamento podem reduzir significativamente os compostos bioativos do cacau.
Por isso, chocolates com maior concentração de cacau e menor processamento tendem a preservar melhor essas substâncias.

### Qual concentração costuma ser mais interessante?
Na prática:
* chocolates 70% cacau ou mais;
* cacau em pó 100%;
* e pasta de cacau
costumam apresentar perfil mais rico em compostos fenólicos.

Já chocolates muito ao leite ou extremamente açucarados possuem menor concentração de cacau e maior densidade energética.

### Quantidade importa
Mesmo sendo rico em compostos bioativos, o cacau continua sendo um alimento calórico devido à presença natural de gordura.
Na prática clínica, quantidades em torno de **10–15 g de cacau puro ao dia** costumam ser utilizadas como consumo funcional equilibrado.
O excesso pode aumentar significativamente a ingestão calórica, açúcar (dependendo do produto) e desconfortos gastrointestinais em pessoas sensíveis.

### Cacau não substitui tratamento
Apesar dos achados promissores, o cacau não deve ser visto como tratamento isolado para doenças cardiovasculares.
Os benefícios observados fazem parte de um contexto maior que inclui:
* padrão alimentar;
* sono;
* atividade física;
* manejo do estresse;
* e estilo de vida.

Ainda assim, o cacau pode ocupar um espaço interessante dentro de estratégias nutricionais mais equilibradas e prazerosas.

### Muito além do chocolate
Hoje, o cacau vem sendo estudado como um alimento funcional complexo, capaz de unir experiência sensorial, compostos bioativos e potencial benefício cardiovascular.
Quanto menor o processamento e maior a qualidade da matéria-prima, maior tende a ser a preservação dos flavonoides naturalmente presentes no cacau.`,
    referencesList: [
      { title: 'Katz DL et al. Cocoa and Cardiovascular Health. Circulation.' },
      { title: 'Grassi D et al. Cocoa flavanols and cardiovascular health. Journal of Hypertension.' },
      { title: 'Chocolate and Health: A Review', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4696435/' },
      { title: 'From Cocoa to Chocolate: Effect of Processing on Flavanols and Methylxanthines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9698929/' },
      { title: 'Hooper L et al. Effects of chocolate, cocoa, and flavan-3-ols on cardiovascular health. American Journal of Clinical Nutrition.' }
    ]
  }
];

export const NEWSLETTER = BLOG_POSTS;
