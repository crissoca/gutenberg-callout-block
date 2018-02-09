/**
 * BLOCK: column-block
 *
 * Registering a layout block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import classnames from 'classnames';

const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
	Editable,
	MediaUpload,
	BlockControls,
	AlignmentToolbar,
} = wp.blocks;

const { Button } = wp.components;

const sortOutCSSClasses = ( alignment, className ) => {

	let wrapClass = classnames( className, 'flex', 'row' );

	// Defaults
	let textClass = 'order-last';
	let imageClass = 'order-first';

	if ( 'left' === alignment || 'right' === alignment ) {
		textClass = alignment === 'right' ? 'order-first' : 'order-last';
		imageClass = alignment === 'right' ? 'order-last' : 'order-first';
		wrapClass = classnames( className, 'flex', 'row' );
	} else if ( 'center' === alignment ) {
		textClass = '';
		imageClass = '';
		wrapClass = className;
	}

	imageClass = classnames( imageClass, 'col', 'foo', 'col-md-6' );
	textClass = classnames( textClass, 'text-block', 'col', 'col-md-6' );

	const imageClasses = classnames( imageClass );
	const textClasses = classnames( textClass );

	return [
		imageClasses,
		textClasses,
		wrapClass
	]
};

registerBlockType( 'callout-block/bootstrap-callout', {

	title: __( 'Bootstrap Callout' ),
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Bootstrap Callout' ),
	],
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.callout-body',
		},
		alignment: {
			type: 'string',
		}
	},

	edit: ( { attributes, className, isSelected, setAttributes } ) => {
		const { mediaID, mediaURL, body, alignment, title } = attributes;

		const onChangeTitle = value => {
			setAttributes( { title: value } );
		};

		const onSelectImage = media => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		const onChangeBody = value => {
			setAttributes( { body: value } );
		};

		const [ imageClasses, textClasses, wrapClass ] = sortOutCSSClasses( alignment, className );

		return [
			isSelected && (
				<BlockControls key="controls">
					<AlignmentToolbar
						value={alignment}
						onChange={( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						}}
					/>
				</BlockControls>
			),
			<div className={wrapClass} key="container">
				<div className={imageClasses}>
					<div className="callout-image">
						<MediaUpload
							onSelect={onSelectImage}
							type="image"
							value={mediaID}
							render={( { open } ) => (
								<Button className={mediaID ? 'image-button' : 'button button-large'} onClick={open}>
									{!mediaID ? __( 'Upload Image' ) : <img src={mediaURL} />}
								</Button>
							)}
						/>
					</div>
				</div>
				<div className={textClasses}>
					<RichText
						tagName="h2"
						placeholder={__( 'Write a callout title…' )}
						value={title}
						onChange={onChangeTitle}
					/>
					<RichText
						tagName="div"
						multiline="p"
						className="callout-body"
						placeholder={__( 'Write the callout body' )}
						value={body}
						onChange={onChangeBody}
					/>
				</div>
			</div>
		];
	},
	save: props => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				body,
				alignment
			}
		} = props;

		const [ imageClasses, textClasses, wrapClass ] = sortOutCSSClasses( alignment, className );

		return (
			<div className="bootstrap-block">
				<div className={wrapClass}>
					<div className={imageClasses}>
						{
							mediaURL && (
								<img className="recipe-image" src={mediaURL} />
							)
						}
					</div>
					<div className={textClasses}>
						<h2>
							{title}
						</h2>
						<div className="callout-body">
							{body}
						</div>
					</div>
				</div>
			</div>
		);
	}
} );
