var cart = {
  add: function (product_id, quantity, price) {
    $.ajax({
      url: 'index.php?route=checkout/cart/add',
      type: 'post',
      data:
        'product_id=' +
        product_id +
        '&quantity=' +
        (typeof quantity != 'undefined' ? quantity : 1),
      dataType: 'json',
      success: function (json) {
        if (json['redirect']) {
          location = json['redirect'];
        }
        if (json['success']) {
          if (product_id != 51) {
            $('.cart-quantity').removeClass('empty').html(json['quantity']);
            let cproduct = $('[data-pid="' + product_id + '"]'),
              prevValue = parseInt($('.minicart-total').text());
            if (cproduct.hasClass('cart-added')) {
              let prevQ = parseInt(
                cproduct.first().find('.item__add-quantity').text()
              );
              cproduct.find('.item__add-quantity').html(prevQ + quantity);
            } else {
              if ($('.languages-block .active').data('name') == 'uk-ua')
                cproduct
                  .addClass('cart-added')
                  .children('.image')
                  .children('a')
                  .after(
                    '<div class="item__add"><span class="item__add-icon"></span><span class="item__add-text">Додано <span class="item__add-quantity">' +
                      quantity +
                      '</span> до кошика</span></div>'
                  );
              else
                cproduct
                  .addClass('cart-added')
                  .children('.image')
                  .children('a')
                  .after(
                    '<div class="item__add"><span class="item__add-icon"></span><span class="item__add-text">Добавлено <span class="item__add-quantity">' +
                      quantity +
                      '</span> в корзину</span></div>'
                  );
            }
            if (prevValue == 0) {
              $('.mobile-minicart').show();
              $('body').addClass('mict');
              $('.mobile-phone-circle').addClass('carted');
            }
            $('.minicart-total').text(
              prevValue + parseInt(price) * parseInt(quantity)
            );
          }
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText
        );
      },
    });
  },
  update: function (key, quantity) {
    $.ajax({
      url: 'index.php?route=checkout/cart/edit',
      type: 'post',
      data:
        'key=' +
        key +
        '&quantity=' +
        (typeof quantity != 'undefined' ? quantity : 1),
      dataType: 'json',
      success: function (json) {
        let newTotalQty = 0,
          productPrice = parseInt(
            $('.cartproduct[data-cid="' + key + '"]')
              .find('.cartproduct-price--num')
              .text()
          );
        $('[data-cid="' + key + '"]')
          .find('input[type="text"]')
          .val(quantity);
        $('.cartproducts-wrapper input[type="text"]').each(function () {
          newTotalQty += parseInt($(this).val());
        });
        $('.cartproduct[data-cid="' + key + '"]')
          .find('.cartproduct-total--num')
          .text(productPrice * quantity);
        $('.cart-value .cart-quantity').text(newTotalQty);
        let cartTotal = 0;
        $('.cartproducts-wrapper .cartproduct-total--num').each(function () {
          cartTotal += parseInt($(this).text());
        });
        $('.cart-totalnum span').first().text(cartTotal);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText
        );
      },
    });
  },
  remove: function (key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      success: function (json) {
        let curCartQty = parseInt(
            $('.cart-value .cart-quantity').first().text()
          ),
          productQty = parseInt(
            $('.cartproduct[data-cid="' + key + '"]')
              .find('input[type="text"]')
              .val()
          );
        if (
          $('.cartproduct[data-cid="' + key + '"]').hasClass('free-product')
        ) {
          $('.csticks-qty input').val(0);
        }
        $('.cartproduct[data-cid="' + key + '"]').remove();
        let newCty = curCartQty - productQty;
        if (!newCty) {
          newCty = 0;
        }
        $('.cart-value .cart-quantity').text(newCty);
        let cartTotal = 0;
        $('.cartproducts-wrapper .cartproduct-total--num').each(function () {
          cartTotal += parseInt($(this).text());
        });
        $('.cart-totalnum span').first().text(cartTotal);
        if ($('.cartproduct').length < 1) {
          $('.cartproducts-wrapper, .cartproducts-total').remove();
          $('.cart-wrapper > h2').text('Ваша корзина пока пуста');
        } else if (
          $('.cartproduct.free-product').length > 0 &&
          $('.cartproduct').length == 1
        ) {
          cart.remove($('.cartproduct.free-product').data('cid'));
          $('.cartproducts-wrapper, .cartproducts-total').remove();
          $('.cart-wrapper > h2').text('Ваша корзина пока пуста');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText
        );
      },
    });
  },
};
var voucher = {
  add: function () {},
  remove: function (key) {
    $.ajax({
      url: 'index.php?route=checkout/cart/remove',
      type: 'post',
      data: 'key=' + key,
      dataType: 'json',
      success: function (json) {
        // Need to set timeout otherwise it wont update the total
        setTimeout(function () {
          $('#cart > button').html(
            '<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' +
              json['total'] +
              '</span>'
          );
        }, 100);

        if (
          getURLVar('route') == 'checkout/cart' ||
          getURLVar('route') == 'checkout/checkout'
        ) {
          location = 'index.php?route=checkout/cart';
        } else {
          $('#cart > ul').load('index.php?route=common/cart/info ul li');
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(
          thrownError + '\r\n' + xhr.statusText + '\r\n' + xhr.responseText
        );
      },
    });
  },
};
jQuery(function ($) {
  $('.scroll-up').click(function () {
    var destination = 0;
    $('html, body').animate({ scrollTop: destination }, 400);
    return false;
  });
  if (window.matchMedia('(min-width: 1025px)').matches) {
    $(window).on('load', function () {
      $('#left-menu').mCustomScrollbar({ scrollInertia: 0 });
    });
  }
  $(window).scroll(function () {
    if ($(this).scrollTop() > $('.content').offset().top) {
      $('.mobile-header-container.fixed').show();
    } else {
      $('.mobile-header-container.fixed').hide();
    }
  });
  function setMaxWidth(selector) {
    let curMax = 0;
    $(selector).each(function () {
      if ($(this).width() > curMax) {
        curMax = $(this).width();
      }
    });
    $(selector).css('width', curMax + 1);
  }
  if ($('.order-number').length > 0 && $(window).width() < 830) {
    setMaxWidth('.order-number');
    setMaxWidth('.order-status');
    setMaxWidth('.order-data');
    setMaxWidth('.order-quantity');
    setMaxWidth('.order-view');
  }
  if ($('.order-details-nav').length > 0 && $(window).width() < 830) {
    setMaxWidth('.odetail-name');
    setMaxWidth('.odetail-quantity');
    setMaxWidth('.odetail-price');
    setMaxWidth('.odetail-total');
  }
  $('.mobile-menu-toggle').click(function () {
    $('.mobile-menu').show();
  });
  $('.mobile-menu .menu-close').click(function () {
    $('.mobile-menu').hide();
  });
  $('.has-submenu').mouseenter(function () {
    $(this).children('.submenu').slideDown(300).addClass('submenu--active');
  });
  $('.submenu').mouseleave(function () {
    $(this).slideUp(300).removeClass('submenu--active');
  });
  $('header a[href="#"]').click(function (e) {
    e.preventDefault();
  });
  $('.product-thumb').click(function (e) {
    if (
      !$('.product-thumb button').is(e.target) &&
      $('.product-thumb button').has(e.target).length === 0
    ) {
      if ($(window).width() < 1024) {
        location = $(this).find('.image').children('a').attr('href');
      } else {
        let pid = $(this).data('pid');
        if ($(this).hasClass('product--active')) {
          $(this).removeClass('product--active');
          $('.product-full.product--active')
            .removeClass('product--active')
            .fadeOut();
        } else {
          $('.product-thumb.product--active').removeClass('product--active');
          $(this).addClass('product--active');
          $('.product-full.product--active')
            .removeClass('product--active')
            .fadeOut();
          $('.product-full[data-pid="' + pid + '"]')
            .addClass('product--active')
            .fadeIn();
        }
      }
    }
  });

  $('.form-language .language-select').on('click', function (e) {
    e.preventDefault();

    $("#form-language input[name='code']").val($(this).data('name'));

    $('#form-language').submit();
  });

  if (!$.cookie('city')) {
    $('.city-popup').fadeIn();
  }
  $('.form-city a').on('click', function (e) {
    e.preventDefault();
    let date = new Date();
    const popupExpires = date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    $.cookie('city', true, {
      expires: popupExpires,
      path: '/',
      domain: 'sushi-box.shop',
    });
    window.location.href = $(this).attr('href');
  });
  $('.mobile-language').click(function () {
    $('.city-popup').fadeIn();
  });

  /*
if (!$.cookie('popup') && (date.getHours() == fromTime || date.getHours() <= toTime)) {
        $('.image-popup').fadeIn();
    }
*/
  $('.image-popup .popup-close').click(function () {
    var date = new Date();
    var fromTime = 23,
      toTime = 11,
      ftoTime = 12;
    date.setTime(date.getTime() + ftoTime * 60 * 60 * 1000);
    $.cookie('popup', true, {
      expires: date,
      path: '/',
    });
    $('.image-popup').fadeOut();
  });

  $('.popup-link').click(function (e) {
    e.preventDefault();
    let needPopup = $(this).attr('href');
    $(needPopup).fadeIn();
  });
  $('.popup-close').click(function () {
    $(this).closest('.popup').fadeOut();
  });
  $('.products-filter .filter-item').click(function () {
    let needToFilter = $(this).data('filter-by');
    $('.product-layout, .product-full').hide();
    $('.product-thumb.product--active').removeClass('product--active');
    if ($('.product-layout.' + needToFilter).length > 0) {
      let total = $('.product-layout.' + needToFilter).length;
      $('.product-layout.' + needToFilter).each(function () {
        let pindex = $(this).index('.product-layout.' + needToFilter) + 1,
          pid = $(this).children('.product-thumb').data('pid');
        if (total < 3) {
          $('.product-full[data-pid="' + pid + '"]').insertAfter(
            $('.product-layout.' + needToFilter).last()
          );
        } else {
          let nindex = pindex;
          if (nindex % 3 != 0) {
            while (nindex % 3 != 0) {
              nindex++;
            }
          }
          nindex--;
          $('.product-full[data-pid="' + pid + '"]').insertAfter(
            $('.product-layout.' + needToFilter).eq(nindex)
          );
        }
      });
      $('.product-layout.' + needToFilter).show();
    }
    $(this)
      .addClass('active-filter')
      .siblings('.active-filter')
      .removeClass('active-filter');
  });
  $('.qty-toggle > a').click(function (e) {
    e.preventDefault();
    let curQty = parseInt(
        $(this).parent().siblings('input[type="text"]').val()
      ),
      productPrice = parseInt($(this).parent().siblings('span').text()),
      cartID = parseInt($(this).closest('.cartproduct').data('cid')),
      needQty = curQty;
    if ($(this).hasClass('qty-toggle--more') && curQty + 1 > 0) {
      needQty++;
    } else if ($(this).hasClass('qty-toggle--less') && curQty - 1 > 0) {
      needQty--;
    }
    cart.update(cartID, needQty);
  });
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  if ($('input[name="customer[select_city]"]').length > 0) {
    $('.simple-content').on(
      'change',
      'input[name="customer[select_city]"]',
      function (e) {
        let subAddress = 'Никольская 25, парковка отель Александровский';
        if (e.currentTarget.id == 'odessa') {
          if ($('.languages-block .active').data('name') == 'uk-ua') {
            subAddress = 'вул. Дехтярна 18';
          } else {
            subAddress = 'ул. Дехтярная 18';
          }
        } else {
          if ($('.languages-block .active').data('name') == 'uk-ua') {
            subAddress = 'Микільська 25, паркування готель Олександрівський';
          } else {
            subAddress = 'Никольская 25, парковка отель Александровский';
          }
        }
        $('label[for="pickup.pickup"] span').html(subAddress);
      }
    );
  }
});
