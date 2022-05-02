import { CoreSettings, CropperState, ResizeDirections } from '../types';
import { copyState } from './copyState';
import {
	getAspectRatio,
	getMinimumSize,
	getPositionRestrictions,
	getSizeRestrictions,
	mergePositionRestrictions,
	coordinatesToPositionRestrictions,
	isInitializedState,
} from '../service';
import { resizeCoordinatesAlgorithm } from '../algorithms';

export interface ResizeOptions {
	compensate?: boolean;
	preserveAspectRatio?: boolean;
	allowedDirections?: {
		left?: boolean;
		right?: boolean;
		top?: boolean;
		bottom?: boolean;
	};
	respectDirection?: 'width' | 'height';
}

export type ResizeAlgorithm<Settings extends CoreSettings = CoreSettings> = (
	state: CropperState,
	settings: Settings,
	directions: ResizeDirections,
	options: ResizeOptions,
) => CropperState;

export function resizeCoordinates(
	state: CropperState,
	settings: CoreSettings,
	directions: ResizeDirections,
	options: ResizeOptions,
) {
	const minimumSize = getMinimumSize(state);

	const sizeRestrictions = getSizeRestrictions(state, settings);

	return isInitializedState(state)
		? {
				...copyState(state),
				coordinates: resizeCoordinatesAlgorithm(state.coordinates, directions, options, {
					positionRestrictions: mergePositionRestrictions(
						getPositionRestrictions(state, settings),
						coordinatesToPositionRestrictions(state.visibleArea),
					),
					sizeRestrictions: {
						maxWidth: Math.min(sizeRestrictions.maxWidth, state.visibleArea.width),
						maxHeight: Math.min(sizeRestrictions.maxHeight, state.visibleArea.height),
						minWidth: Math.max(Math.min(sizeRestrictions.minWidth, state.visibleArea.width), minimumSize),
						minHeight: Math.max(
							Math.min(sizeRestrictions.minHeight, state.visibleArea.height),
							minimumSize,
						),
					},
					aspectRatio: getAspectRatio(state, settings),
				}),
		  }
		: state;
}
