export interface Coordinates {
	width: number;
	height: number;
	top: number;
	left: number;
}

export type VisibleArea = Coordinates;

export interface Limits {
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}

export interface SizeRestrictions {
	minWidth: number;
	maxWidth: number;
	minHeight: number;
	maxHeight: number;
}
export type AreaSizeRestrictions = SizeRestrictions;

export type PostprocessFunction = (state: CropperState, settings: CropperSettings, action?: string) => CropperState;

export type PositionRestrictions = Limits;

export type AreaPositionRestrictions = Limits;

export interface ResizeDirections {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface MoveDirections {
	top: number;
	left: number;
}

export interface Point {
	top: number;
	left: number;
}

export interface Size {
	width: number;
	height: number;
}
export type ImageSize = Size;

export type Boundary = Size;

export interface Intersections {
	left: number;
	top: number;
	bottom: number;
	right: number;
}

export interface AspectRatio {
	minimum?: number;
	maximum?: number;
}

export interface CropperEvent {
	type: string;
}

export interface Diff {
	left: number;
	top: number;
}

export interface Position {
	left: number;
	top: number;
}

export type Priority = 'coordinates' | 'visibleArea';

export type PositionDirection = 'left' | 'top' | 'right' | 'bottom';
export type HorizontalDirection = 'left' | 'right';
export type VerticalDirection = 'top' | 'bottom';
export type MainDirections = 'left' | 'top';
export type ImageRestriction = 'fillArea' | 'fitArea' | 'stencil' | 'none';
export type HorizontalCardinalDirection = 'west' | 'east';
export type VerticalCardinalDirection = 'north' | 'south';
export type CardinalDirection = HorizontalCardinalDirection | VerticalCardinalDirection;
export type OrdinalDirection =
	| HorizontalCardinalDirection
	| VerticalCardinalDirection
	| 'westNorth'
	| 'westSouth'
	| 'eastNorth'
	| 'eastSouth';

export interface Scale {
	factor: number;
	center?: Point;
}

export interface Transforms {
	rotate: number;
	flip: {
		horizontal: boolean;
		vertical: boolean;
	};
}

export type CoordinatesTransform = ((state: CropperState, settings: CropperSettings) => Partial<Coordinates>) | Partial<Coordinates>;

export interface CropperState {
	boundary: Boundary;
	imageSize: ImageSize;
	transforms: Transforms;
	visibleArea: VisibleArea | null;
	coordinates: Coordinates | null;
}

export type BoundarySizeAlgorithm = ({ boundary, size }: { boundary: HTMLElement; size: Size }) => Boundary;

export type DefaultSize<Settings = CropperSettings> = Size | ((state: CropperState, props: Settings) => Size);

export type DefaultPosition<Settings = CropperSettings> =
	| Position
	| ((state: CropperState, props: Settings) => Position);

export type DefaultVisibleArea<Settings = CropperSettings> =
	| VisibleArea
	| ((state: CropperState, props: Settings) => VisibleArea);

export type DefaultCoordinates<Settings = CropperSettings> =
	| (CoordinatesTransform | CoordinatesTransform[])
	| ((state: CropperState, settings: Settings) => CoordinatesTransform | CoordinatesTransform[]);

export interface CropperSettings {
	defaultCoordinates: DefaultCoordinates;
	defaultVisibleArea: DefaultVisibleArea;
	areaPositionRestrictions:
		| AreaPositionRestrictions
		| ((state: CropperState, settings: CropperSettings) => AreaPositionRestrictions);
	areaSizeRestrictions:
		| AreaSizeRestrictions
		| ((state: CropperState, settings: CropperSettings) => AreaSizeRestrictions);
	sizeRestrictions: SizeRestrictions | ((state: CropperState, settings: CropperSettings) => SizeRestrictions);
	positionRestrictions:
		| PositionRestrictions
		| ((state: CropperState, settings: CropperSettings) => PositionRestrictions);
	aspectRatio: AspectRatio | ((state: CropperState, setting: CropperSettings) => AspectRatio);
}

export interface CropperImage {
	src: string;
	revoke: boolean;
	transforms: Transforms;
	arrayBuffer: ArrayBuffer | null;
	width: number;
	height: number;
}

export interface CropperTransitions {
	timingFunction: string;
	duration: number;
	active: boolean;
}

export interface Stencil {
	aspectRatio: () => AspectRatio;
}
