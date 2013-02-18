using Cykel.Ember.Models;
using Cykel.Ember.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Cykel.Ember.Controllers
{
    public class StationListItemsController : ApiController
    {
        private readonly IDbContext _dbContext;

        public StationListItemsController(IDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public StationListItems Get()
        {
            return new StationListItems
            {
                stationListItems = this._dbContext.Stations.GetAll().Select(s => new StationListItemModel { title = s.name, subTitle = s.lat.ToString() }).ToList()
            };
        }

        public StationListItem Get(string id)
        {
            var station = this._dbContext.Stations.Get(id);

            return new StationListItem
            {
                stationListItem = new StationListItemModel { body = station.bikes, title=station.name, subTitle = station.lat.ToString() }
            };
        }
    }
}
