/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShopifyIntegrationMethod {
  title: string;
  badge: string;
  recommendedFor: string;
  description: string;
  steps: string[];
  codeSnippet?: string;
  pros: string[];
  cons: string[];
}

export const SHOPIFY_INTEGRATION_METHODS: ShopifyIntegrationMethod[] = [
  {
    title: '1. Shopify App Proxy (Integração 100% Nativa na URL da Loja)',
    badge: 'Recomendado Oficial',
    recommendedFor: 'Permite carregar o portal diretamente em www.seracacau.com.br/apps/nutri-portal sem redirecionamento externo.',
    description: 'O App Proxy é o recurso oficial da Shopify para integrar aplicações web externas dentro do mesmo domínio e layout do tema da loja. A Shopify recebe as requisições, valida a sessão do cliente e serve o portal mantendo o header, footer e checkout originais.',
    steps: [
      'Criar um Custom App no painel Shopify Partners ou na loja (Configurações > Apps e canais de vendas > Desenvolver apps).',
      'Ativar o "App Proxy" nas configurações do app.',
      'Definir o Subpath: `apps` e Subpath prefix: `nutri-portal` (resultando em `seracacau.com.br/apps/nutri-portal`).',
      'Configurar a Proxy URL apontando para o servidor do portal da área de membros.',
      'Adicionar o link "Área de Membros / Nutris" no menu de navegação do tema Shopify (Online Store > Navigation).'
    ],
    codeSnippet: `<!-- Exemplo de verificação de autenticação via Liquid no tema Shopify -->
{% if customer and customer.tags contains 'nutricionista' %}
  <iframe 
    src="/apps/nutri-portal?logged_customer_id={{ customer.id | hmac_sha256: 'SUA_CHAVE_SECRETA' }}&email={{ customer.email | url_encode }}" 
    style="width: 100%; height: 90vh; border: none;"
    title="Portal Nutricionistas Será Cacau"
  ></iframe>
{% else %}
  <div class="nutri-gate-login" style="text-align: center; padding: 60px 20px;">
    <h2>Área Exclusiva de Nutricionistas & Prescritores</h2>
    <p>Acesse com sua conta cadastrada para visualizar cursos, laudos e fichas técnicas.</p>
    <a href="/account/login?return_url=/apps/nutri-portal" class="btn button">Entrar com Minha Conta</a>
  </div>
{% endif %}`,
    pros: [
      'A nutricionista nunca sai do domínio da Será Cacau (mesma URL www.seracacau.com.br)',
      'Aproveita o carrinho de compras e cupons da loja sem fricção',
      'Segurança garantida por assinatura criptográfica HMAC da Shopify'
    ],
    cons: [
      'Requer criar um Custom App no painel Shopify (processo de 5 minutos)'
    ]
  },
  {
    title: '2. Shopify Multipass / Customer SSO (Login Único Automático)',
    badge: 'Seamless SSO',
    recommendedFor: 'Nutricionistas que já possuem conta na loja Shopify entram no portal com um clique sem digitar senha novamente.',
    description: 'O Shopify Multipass permite autenticação Single Sign-On (SSO). Quando a nutricionista faz login na loja virtual, um token criptografado autoriza o acesso instantâneo ao portal de membros.',
    steps: [
      'Habilitar o Multipass no painel Shopify (Configurações > Checkout e contas de clientes).',
      'Gerar a Chave Secreta Multipass de 128 bits.',
      'O portal recebe o token JWT/Multipass e sincroniza os dados cadastrais (nome, e-mail, pedidos, pontos).',
      'Garante que alterações de senha na loja atualizem o acesso imediatamente.'
    ],
    pros: [
      'Experiência de login 100% transparente para a profissional',
      'Sincronização imediata de pedidos feitos na loja com os pontos do portal'
    ],
    cons: [
      'Disponível nativamente em planos Shopify Plus ou via Apps autorizados'
    ]
  },
  {
    title: '3. Subdomínio Integrado (membros.seracacau.com.br)',
    badge: 'Rápido & Independente',
    recommendedFor: 'Setup imediato com design imersivo de aplicativo web completo.',
    description: 'Configuração de uma entrada CNAME no DNS do domínio da Será Cacau apontando `membros.seracacau.com.br` para o servidor da aplicação. No menu principal da loja Shopify, adiciona-se o botão "Portal Nutri".',
    steps: [
      'No gerenciador de domínio (ex: Registro.br, GoDaddy, Cloudflare), adicionar registro CNAME: `membros` -> `ais-dev-3pnsyl46dbwcghpinjzlyv-313691122432.us-east1.run.app`.',
      'No Shopify Admin > Online Store > Navigation, adicionar o item de menu "Área da Nutricionista" com link para `https://membros.seracacau.com.br`.',
      'Ativar os botões de compra direta e links com o cupom NUTRI15 pré-aplicado.'
    ],
    pros: [
      'Setup em menos de 10 minutos',
      'Isolamento total de performance: a navegação na loja não afeta o portal',
      'Identidade visual 100% preservada no mesmo domínio institucional'
    ],
    cons: [
      'Troca sutil de subdomínio na barra de navegação'
    ]
  }
];

export const SHOPIFY_SUPPORT_TEMPLATE = `Olá equipe de suporte da Shopify!

Estamos desenvolvendo a Área de Membros e Portal de Prescritores exclusiva para a nossa loja Será Cacau (seracacau.com.br).

Gostaríamos de orientações sobre a melhor configuração para as seguintes opções:

1. Configuração do App Proxy para carregar a rota '/apps/nutri-portal' de forma nativa e transparente dentro da nossa loja, aproveitando os dados da cliente logada (customer tags: 'nutricionista').
2. Melhores práticas para autenticação Single Sign-On (SSO) com as contas de clientes existentes.
3. Incorporação de blocos Liquid / Theme App Extensions nas páginas de conta do cliente.

Poderiam nos confirmar a documentação oficial para a criação do Custom App com App Proxy na nossa conta?

Agradecemos o suporte!
Equipe Será Cacau`;
