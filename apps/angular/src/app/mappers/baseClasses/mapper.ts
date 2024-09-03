/** Mapper base. */
export type Mapper<TDto, TDomain> = {

	/**
	 * Map from Dto to Domain.
	 * @param dto Dto.
	 * @returns Domain.
	 */
	fromDto(dto: TDto): TDomain;

	/**
	 * Map from Domain to Dto.
	 * @param dto Domain.
	 * @returns Dto.
	 */
	toDto(model: TDomain): TDto;
};
