using Cykel.Ember.Models;
using Cykel.Ember.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace Cykel.Ember.Controllers
{
    public class StationListItemsController : ApiController
    {
        private readonly IDbContext _dbContext;

        public StationListItemsController(IDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public object Get()
        {
            return new
            {
                StationListItems = this._dbContext.Stations.GetAll().Select(ToModel).ToList()
            };
        }

        public object Get(string id)
        {
            return new
            {
                StationListItem = ToModel(this._dbContext.Stations.Get(id))
            };
        }

        private StationListItemModel ToModel(StationModel station)
        {
            return new StationListItemModel
            {
                id = station.id,
                station_id = station.id,
                body = station.id,
                title = station.name,
                subTitle = station.lat.ToString()
            };
        }
    }
}
