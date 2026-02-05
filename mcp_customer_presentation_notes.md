# MCP Server - Customer Presentation Notes

## Progress Updates
**Paste your progress updates below:**

Kameleoon MCP Server: Roadmap & Specs

1. Overview

This document outlines the roadmap for the Kameleoon MCP (Model Context Protocol) Server. The goal is to provide AI agents with direct, secure access to Kameleoon's experimentation platform to accelerate developer workflows.


* Lot 0 (MVP): Basic CRUD operations for Feature Flags (Search, Retrieve, Update, Duplicate, Delete).
* Lot 1 (Production & Governance): Experimentation workflows, asset extraction, and performance governance (responsive to enterprise needs like Inchcape).


2. Lot 0: MVP (Immediate Release)

Focus: Safe, read-only access to Feature Flags to assist with local development and debugging.


Scope
	Function Name
	Description
	Comments

Feature Flag
	list_feature_flags
	Lists feature flags visible to the current credentials. Supports optional pagination, sorting, and simple keyword filtering.
	done

Feature Flag
	get_feature_flag
	Return a single feature flag configuration identified by featureKey and siteCode.
	done

Feature Flag
	request_results
	Get current performance metrics for a live flag/experiment.
	done

Feature Flag
	create_feature_flag
	Create a new feature flag with the provided configuration.
	done (but very moody and can be improved)

Feature Flag
	duplicate_feature_flag
	Duplicate an existing feature flag configuration for a given site.
	done

Feature Flag
	update_feature_flag
	Update a feature flag configuration using flattened fields
	removed in favor of more precise tools, which will be in Lot 1

Feature Flag
	enable_feature_flag/disable_feature_flag
	Enable/disable a feature flag for the given environment key.
	done

Feature Flag
	update_feature_flag_environment
	Update environment-specific configuration via JSON patch object.
	removed in favor of more precise tools, which will be in Lot 1

Feature Flag
	preview_feature_flag_update
	Preview the result of a feature flag update locally without persisting upstream.
	removed in favor of more precise tools, which will be in Lot 1

Feature Flag
	get_feature_flag_activity_logs
	View recent audit logs (who changed what and when) for a flag (type/page/perPage/sort).
	In progress (added but not tested well)

Feature Flag
	delete_feature_flag
	Delete a feature flag by key for a given site
	done


