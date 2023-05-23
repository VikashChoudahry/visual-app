module.exports = {
	insert: '',
	update: {},
	delete: {
		byId: '',
	},
    select: {
		byId: '',
		all: `
			SELECT 
				d.id as "listing_id",
				listing_date,
				ROUND(revenue, 3) as "revenue",
				s.title as "broker",
				TO_CHAR(d.listing_date, 'Month') as "listing_month"
			FROM
				deals d,
				sites s
			WHERE d.site_id = s.id
			AND d.listing_date >= $1
			AND d.listing_date <= $2
			ORDER BY d.listing_date ASC
			LIMIT $3 OFFSET $4;
		`,
		averageRevenueBySites: `
			SELECT
				d.site_id as "site_id",
				s.title as "site_title",
				TO_CHAR(d.listing_date, 'YYYY Mon') as "timestamp_label",
				ROUND(AVG(d.revenue), 3) as "revenue",
				count(d.site_id)
			FROM sites s, deals d
			WHERE d.site_id = s.id
			AND d.listing_date >= $1
			AND d.listing_date <= $2
			GROUP BY site_id, site_title, timestamp_label
			ORDER BY timestamp_label ASC
			LIMIT $3 OFFSET $4;
		`
	},
};
