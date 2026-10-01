const projetosData = [
  {
    id: 'voluntariado',
    badgeClass: 'badge--voluntariado',
    badgeText: 'Voluntariado',
    title: 'Voluntariado',
    description: 'Participe das ações da ONG oferecendo seu tempo e disposição para ajudar a transformar vidas. Faça seu cadastro para demonstrar interesse em ser voluntário.',
    linkHref: '#cadastro',
    linkText: 'Quero ser voluntário'
  },
  {
    id: 'campanhas',
    badgeClass: 'badge--doacoes',
    badgeText: 'Doações',
    title: 'Campanhas de doação',
    description: 'As campanhas de doação recebem itens que ajudam a atender às necessidades da comunidade.',
    items: [
      'Alimentos não perecíveis',
      'Roupas',
      'Materiais de higiene'
    ]
  },
  {
    id: 'contribuicao',
    badgeClass: 'badge--contribuicao',
    badgeText: 'Contribuição',
    title: 'Contribuição financeira',
    description: 'As contribuições financeiras ajudam a manter os projetos e ampliar o atendimento da ONG.',
    linkHref: '#cadastro',
    linkText: 'Quero contribuir'
  }
];

export function renderProjetosCards() {
  const container = document.getElementById('projetos-dinamicos');

  if (!container) {
    return '';
  }

  const cardsHtml = projetosData.map((projeto) => `
    <section id="${projeto.id}">
      <span class="badge ${projeto.badgeClass}">${projeto.badgeText}</span>
      <h2>${projeto.title}</h2>
      <p>${projeto.description}</p>
      ${projeto.items ? `<ul>${projeto.items.map((item) => `<li>${item}</li>`).join('')}</ul>` : `<a href="${projeto.linkHref}">${projeto.linkText}</a>`}
    </section>
  `).join('');

  container.innerHTML = cardsHtml;
  return cardsHtml;
}

export const appTemplates = {
  '#inicio': () => `
    <section>
      <h2>Quem somos</h2>
      <p>Somos uma organização dedicada a transformar vidas através de projetos sociais sustentáveis.</p>
      <picture>
        <source srcset="../imagens/acao-social.webp" type="image/webp">
        <source srcset="../imagens/acao-social.jpg" type="image/jpeg">
        <img src="../imagens/acao-social.png"
          alt="Voluntarios distribuindo alimentos durante uma ação social na comunidade" width="600"
          height="400">
      </picture>
    </section>

    <section>
      <h2>Nossa missão</h2>
      <p>Nosso objetivo é promover a inclusão social e o desenvolvimento comunitário, oferecendo oportunidades
        para aqueles que mais precisam.</p>
    </section>

    <section>
      <h2>Entre em contato</h2>
      <address>
        <p>Email:
          <a href="mailto:contato@ongmaosquetransformam.org">contato@ongmaosquetransformam.org</a>
        </p>
        <p>Telefone:
          <a href="tel:+5561999991234">+55 (61) 99999-1234</a>
        </p>
        <p>Brasília - DF</p>
      </address>
    </section>
  `,

  '#projetos': () => `
    <div id="projetos-dinamicos" class="projetos-grid"></div>

    <section class="feedback-examples" aria-labelledby="feedback-examples-title">
      <h2 id="feedback-examples-title">Mensagens do sistema</h2>
      <div class="alert-list">
        <article class="alert alert--success">
          <h3 class="alert__title">Sucesso</h3>
          <p>Exemplo de confirmação para uma ação concluída.</p>
        </article>
        <article class="alert alert--warning">
          <h3 class="alert__title">Aviso</h3>
          <p>Confira as informações antes de continuar.</p>
        </article>
        <article class="alert alert--error">
          <h3 class="alert__title">Erro</h3>
          <p>Não foi possível concluir a solicitação. Tente novamente.</p>
        </article>
        <article class="alert alert--info">
          <h3 class="alert__title">Informação</h3>
          <p>Novidades sobre os projetos serão exibidas aqui.</p>
        </article>
      </div>
      <button class="modal-trigger" type="button" data-modal-open aria-haspopup="dialog"
        aria-controls="feedback-modal">Abrir modal</button>

      <dialog class="modal" id="feedback-modal" aria-labelledby="feedback-modal-title">
        <div class="modal__content">
          <h2 id="feedback-modal-title">Demonstração de modal</h2>
          <p>Esta janela apresenta uma mensagem de exemplo sobre os projetos da ONG.</p>
          <button class="modal__close" type="button" data-modal-close autofocus>Fechar</button>
        </div>
      </dialog>
    </section>

    <aside class="toast" role="status" aria-live="polite" aria-atomic="true">
      <span class="toast__title">Notificação</span>
      <span>Exemplo de confirmação exibida sem interromper a navegação.</span>
    </aside>
  `,

  '#cadastro': () => `
    <section>
      <h2>Formulário de Cadastro</h2>
      <form action="#" method="post">
        <fieldset>
          <legend>Dados pessoais</legend>
          <div>
            <label for="nome">Nome completo:</label>
            <input type="text" id="nome" name="nome" required>
          </div>
          <div>
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
              title="Formato: 000.000.000-00" required>
          </div>
          <div>
            <label for="data-nascimento">Data de nascimento:</label>
            <input type="date" id="data-nascimento" name="data_nascimento" required>
          </div>
        </fieldset>
        <fieldset>
          <legend>Contato</legend>
          <div>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="telefone">Telefone:</label>
            <input type="tel" id="telefone" name="telefone" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}"
              title="Formato: (00) 00000-0000" required>
          </div>
        </fieldset>
        <fieldset>
          <legend>Endereço</legend>
          <div>
            <label for="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" required>
          </div>
          <div>
            <label for="cep">CEP:</label>
            <input type="text" id="cep" name="cep" pattern="[0-9]{5}-[0-9]{3}" title="Formato: 00000-000"
              required>
          </div>
          <div>
            <label for="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" required>
          </div>
          <div>
            <label for="estado">Estado:</label>
            <input type="text" id="estado" name="estado" required>
          </div>
        </fieldset>
        <button type="submit">Enviar</button>
      </form>
    </section>
  `
};
