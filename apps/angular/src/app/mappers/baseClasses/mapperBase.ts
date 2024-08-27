/** Mapper base. */
export abstract class MapperBase<TDto, TDomain> {
	/**
	 * Map from Dto to Domain.
	 * @param dto Dto.
	 * @returns Domain.
	 */
	public abstract fromDto(dto: TDto): TDomain;

	/**
	 * Map from Domain to Dto.
	 * @param dto Domain.
	 * @returns Dto.
	 */
	public abstract toDto(model: TDomain): TDto;
}
