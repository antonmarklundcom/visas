<?php
/**
 * Contact: the business's own details (only the ones content/site.php actually
 * has) plus the lead form.
 *
 * It is also where the no-JS form path lands: enviar.php redirects to
 * /contacto/?enviado=1&s=<slug>, and the thank-you rendered here comes from the
 * same content/lead-values.php record the inline success state uses — one copy
 * of the text, two ways in.
 */

require __DIR__ . '/../lib/bootstrap.php';

$meta = page_meta('/contacto/');
$page = [
    'title'       => $meta['title'],
    'description' => $meta['description'],
    'path'        => '/contacto/',
    'breadcrumbs' => [['label' => ui('nav.contact'), 'path' => '/contacto/']],
];

/* The no-JS thank-you. `s` names the service the lead came from; an unknown
   slug falls back to the model's neutral default rather than 404ing someone who
   has just given us their phone number. */
$sent      = isset($_GET['enviado']);
$sentSlug  = isset($_GET['s']) && is_string($_GET['s']) ? substr($_GET['s'], 0, 80) : '';
$sentLead  = $sentSlug !== '' ? lead_value($sentSlug) : lead_value(null);
$hasError  = isset($_GET['error']);

$contactWhatsapp = whatsapp_link(whatsapp_text_for_page());

require ROOT_DIR . '/partials/head.php';
require ROOT_DIR . '/partials/header.php';
?>
<main id="main">

  <section class="page-hero">
    <div class="container">
      <?php require ROOT_DIR . '/partials/breadcrumbs.php'; ?>
      <div class="page-hero__inner">
        <p class="eyebrow"><?= e(ui('contact.eyebrow')) ?></p>
        <h1><?= e(ui('contact.title')) ?></h1>
        <p class="lead"><?= e(ui('contact.lead')) ?></p>
      </div>
    </div>
  </section>

  <section class="section" id="solicitar">
    <div class="container split split--top">

      <div class="stack">
        <?php if ($sent): ?>
          <?php
            $thanksLead = $sentLead;
            require ROOT_DIR . '/partials/lead-thanks.php';
          ?>
        <?php elseif ($hasError): ?>
          <p class="form-status form-status--error" role="alert">
            <strong><?= e(ui('form.error_title')) ?></strong>
            <?= e(ui('form.error_text')) ?>
          </p>
        <?php endif; ?>

        <ul class="contact-list">
          <?php if (site('phone')): ?>
            <li>
              <span class="contact-list__label"><?= e(ui('contact.phone')) ?></span>
              <a href="tel:+<?= e(phone_digits(site('phone'))) ?>"><?= e(site('phone')) ?></a>
            </li>
          <?php endif; ?>
          <?php if (site('email')): ?>
            <li>
              <span class="contact-list__label"><?= e(ui('contact.email')) ?></span>
              <a href="mailto:<?= e(site('email')) ?>"><?= e(site('email')) ?></a>
            </li>
          <?php endif; ?>
          <?php if (site('street') || site('city')): ?>
            <li>
              <span class="contact-list__label"><?= e(ui('contact.address')) ?></span>
              <?= e(trim(implode(', ', array_filter([site('street'), site('city'), site('country')])), ', ')) ?>
            </li>
          <?php endif; ?>
          <?php if (site('hours')): ?>
            <li>
              <span class="contact-list__label"><?= e(ui('contact.hours')) ?></span>
              <?= e(site('hours')) ?>
            </li>
          <?php endif; ?>
        </ul>

        <?php if ($contactWhatsapp !== null): ?>
          <div class="btn-row">
            <a class="btn btn--whatsapp" href="<?= e($contactWhatsapp) ?>" rel="noopener">
              <?= e(ui('cta.whatsapp_long')) ?>
            </a>
          </div>
        <?php endif; ?>

        <h2><?= e(ui('contact.expect')) ?></h2>
        <ul class="checklist">
          <?php foreach (content('ui')['contact']['steps'] as $contactStep): ?>
            <li><span><?= e($contactStep) ?></span></li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div>
        <?php
        $formId = 'contacto';
        require ROOT_DIR . '/partials/lead-form.php';
        ?>
      </div>

    </div>
  </section>

  <?php require ROOT_DIR . '/partials/cta-band.php'; ?>
</main>
<?php require ROOT_DIR . '/partials/footer.php'; ?>
