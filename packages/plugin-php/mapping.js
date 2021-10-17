export default [
  {
    // Turn Illuminate\View\View;
    // into a link pointing to https://laravel.com/api/8.x/Illuminate/View/View.html
    importPath: 'Illuminate',
    url: 'https://laravel.com/api/8.x/%s.html',
    delimiter: '/',
  },
  {
    // Turn Symfony\Component\Form\Event\SubmitEvent;
    // into a link pointing to https://github.com/symfony/symfony/blob/5.4/src/Symfony/Component/Form/Event/SubmitEvent.php
    importPath: 'Symfony',
    url: 'https://github.com/symfony/symfony/blob/5.4/src/%s.php',
    delimiter: '/',
  },
  {
    // Turns Cake\Core\Configure;
    // into a link pointing to https://api.cakephp.org/4.2/class-Cake.Core.Configure.html
    importPath: 'Cake',
    url: 'https://api.cakephp.org/4.2/class-%s.html',
    delimiter: '.',
  },
];
