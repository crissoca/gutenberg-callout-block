/**
 * BLOCK: column-block
 *
 * Registering a layout block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { times } from 'lodash';
import classnames from 'classnames';

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __, sprintf } = wp.i18n; // Import __() from wp.i18n
const { 
	registerBlockType,
	InnerBlocks, 
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls
} = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'column-block/bootstrap-column-block', {
	title: __( 'Bootstrap Column Block' ),
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'column-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		content: {
			type: 'string',
			source: 'html',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit( { attributes, setAttributes, className, focus }  ) {
		// Creates a <p class='wp-block-cgb-block-column-block'></p>.
		// return (
		// 	<div className={ className }>
		// 		<p>— Hello from the backend.</p>
		// 		<p>
		// 			CGB BLOCK: <code>column-block</code> is a new Gutenberg block
		// 		</p>
		// 		<p>
		// 			It was created via{ ' ' }
		// 			HERE
		// 			<code>
		// 				<a href="https://github.com/ahmadawais/create-guten-block">
		// 					create-guten-block
		// 				</a>
		// 			</code>.
		// 		</p>
		// 	</div>
		// );

		const { align, columns } = attributes;
		const classes = classnames( className, `has-${ columns }-columns` );

	// Define columns as a set of layouts within the inner block list. This
		// will enable the user to move blocks between columns, and will apply
		// a layout-specific class name to the rendered output which can be
		// styled by the columns wrapper to visually place the columns.
		const layouts = times( columns, ( n ) => ( {
			name: `column-${ n + 1 }`,
			label: sprintf( __( 'Column %d' ), n + 1 ),
			icon: 'columns',
		} ) );

		return [
			...focus ? [
				<BlockControls key="controls">
					<BlockAlignmentToolbar
						controls={ [ 'wide', 'full' ] }
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>,
				<InspectorControls key="inspector">
					
				</InspectorControls>,
			] : [],
			<div className={ classes } key="container">
				<InnerBlocks layouts={ layouts } />
			</div>,
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className={ props.className }>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>column-block</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );
