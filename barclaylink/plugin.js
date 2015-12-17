/*
* Barclay inner page link Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 2.1.0
*/

( function(a) {
	
	CKEDITOR.plugins.add( 'barclaylink',
	{
		lang: [ 'en'],
		init: function( editor )
		{
			editor.addCommand( 'barclaylink', new CKEDITOR.dialogCommand( 'barclaylink', {
				allowedContent: 'div{*}(*); iframe{*}[!width,!height,!src,!frameborder,!allowfullscreen]; object param[*]; a[*]; img[*]'
			}));

			editor.ui.addButton( 'barclaylink',
			{
				label : editor.lang.barclaylink.button,
				toolbar : 'insert',
				command : 'barclaylink',
				icon : this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'barclaylink', function ( instance )
			{
				var video;
				if(typeof js_menu == "undefined"){
					js_menu = [['Empty','']];
				}
				return {
					title : editor.lang.barclaylink.title,
					minWidth : 500,
					minHeight : 200,
					contents :
						[{
							id : 'barclaylinkPlugin',
							expand : true,
							elements :
								[
								 {
									type : 'hbox',
									widths : [ '70%', '15%', '15%' ],
									children :
									[
										{
											id : 'txtUrl',
											type : 'text',
											label : editor.lang.barclaylink.txtUrl,
											validate : function ()
											{
												if ( this.isEnabled() )
												{
													if ( !this.getValue() )
													{
														alert( editor.lang.barclaylink.noCode );
														return false;
													}
												}
											}
										}
									]
								},
								{
									id: "allowScriptAccess",
									type: "select",
									label: editor.lang.barclaylink.title2,
									"default": "",
									style: "width : 100%;",
									items: js_menu,
									validate : function ()
											{
												if ( this.isEnabled() )
												{
													if ( !this.getValue() )
													{
														alert( editor.lang.barclaylink.noCodeurl );
														return false;
													}
												}
											}
									
								}
							]
						}
					],
					onOk: function()
					{ 
						var content = '';
						var responsiveStyle='';
						var url_title = '';
						var url_source = '';
						
						url_title  = this.getValueOf( 'barclaylinkPlugin', 'txtUrl' );
						url_source = this.getValueOf( 'barclaylinkPlugin', 'allowScriptAccess' );
						content = '<a href="'+CKEDITOR.config.root_url+url_source+'">'+url_title+'</a>';
						
						var element = CKEDITOR.dom.element.createFromHtml( content );
						var instance = this.getParentEditor();
						instance.insertElement(element);
					}
				};
			});
		}
	});
})();

function handleLinkChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'barclaylinkPlugin', 'txtEmbed' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'barclaylinkPlugin', 'txtEmbed' ).enable();
	}
}

function handleEmbedChange( el, api )
{
	if ( el.getValue().length > 0 )
	{
		el.getDialog().getContentElement( 'barclaylinkPlugin', 'txtUrl' ).disable();
	}
	else {
		el.getDialog().getContentElement( 'barclaylinkPlugin', 'txtUrl' ).enable();
	}
}




/**
 * Converts time in hms format to seconds only
 */
function hmsToSeconds( time )
{
	var arr = time.split(':'), s = 0, m = 1;

	while (arr.length > 0)
	{
		s += m * parseInt(arr.pop(), 10);
		m *= 60;
	}

	return s;
}
