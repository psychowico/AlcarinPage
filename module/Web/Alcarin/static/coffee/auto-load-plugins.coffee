$ ->
    $('select.chosen').chosen {disable_search: true}
    $('select.chosen-search').chosen {}
    $('select.chosen-always-visible').each ->
        _ = $(@)
        _.chosen {}
        chosen = _.data 'chosen'
        chosen.container_mousedown()
        chosen.close_field = ->
            $(document).unbind 'click', chosen.click_test_action
        chosen.results_hide = ->
            chosen.search_field.val ''
            chosen.results_show()
