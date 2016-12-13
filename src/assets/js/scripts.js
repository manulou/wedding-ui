function initMasonry(categories) {
  categories.masonry({itemSelector: '.category', percentPosition: true, columnWidth: '.category' });
}

function togglePackage(tr) {
  var categoriesDiv = $(tr).parent().parent().parent().next();
  if (categoriesDiv.hasClass('hidden')) {
    categoriesDiv.removeClass('hidden');
  } else {
    categoriesDiv.addClass('hidden');
  }

  initMasonry(categoriesDiv.find('.categories'));
  return false;
}
