revoke select on table "storage"."iceberg_namespaces" from "anon";

revoke select on table "storage"."iceberg_namespaces" from "authenticated";

revoke delete on table "storage"."iceberg_namespaces" from "service_role";

revoke insert on table "storage"."iceberg_namespaces" from "service_role";

revoke references on table "storage"."iceberg_namespaces" from "service_role";

revoke select on table "storage"."iceberg_namespaces" from "service_role";

revoke trigger on table "storage"."iceberg_namespaces" from "service_role";

revoke truncate on table "storage"."iceberg_namespaces" from "service_role";

revoke update on table "storage"."iceberg_namespaces" from "service_role";

revoke select on table "storage"."iceberg_tables" from "anon";

revoke select on table "storage"."iceberg_tables" from "authenticated";

revoke delete on table "storage"."iceberg_tables" from "service_role";

revoke insert on table "storage"."iceberg_tables" from "service_role";

revoke references on table "storage"."iceberg_tables" from "service_role";

revoke select on table "storage"."iceberg_tables" from "service_role";

revoke trigger on table "storage"."iceberg_tables" from "service_role";

revoke truncate on table "storage"."iceberg_tables" from "service_role";

revoke update on table "storage"."iceberg_tables" from "service_role";

alter table "storage"."iceberg_namespaces" drop constraint "iceberg_namespaces_bucket_id_fkey";

alter table "storage"."iceberg_tables" drop constraint "iceberg_tables_bucket_id_fkey";

alter table "storage"."iceberg_tables" drop constraint "iceberg_tables_namespace_id_fkey";

alter table "storage"."iceberg_namespaces" drop constraint "iceberg_namespaces_pkey";

alter table "storage"."iceberg_tables" drop constraint "iceberg_tables_pkey";

drop index if exists "storage"."iceberg_namespaces_pkey";

drop index if exists "storage"."iceberg_tables_pkey";

drop index if exists "storage"."idx_iceberg_namespaces_bucket_id";

drop index if exists "storage"."idx_iceberg_tables_namespace_id";

drop table "storage"."iceberg_namespaces";

drop table "storage"."iceberg_tables";


  create policy "Authenticated users can delete their own avatars"
  on "storage"."objects"
  as permissive
  for delete
  to public
using (((bucket_id = 'avatars'::text) AND (auth.uid() IS NOT NULL) AND ((auth.uid())::text = split_part(name, '-'::text, 1))));



  create policy "Authenticated users can update their own avatars"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'avatars'::text) AND (auth.uid() IS NOT NULL) AND ((auth.uid())::text = split_part(name, '-'::text, 1))));



  create policy "Authenticated users can upload their own avatars"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'avatars'::text) AND (auth.uid() IS NOT NULL) AND ((auth.uid())::text = split_part(name, '-'::text, 1))));



  create policy "Avatar images are publicly accessible"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatars'::text));



